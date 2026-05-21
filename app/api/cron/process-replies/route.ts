import { NextResponse } from "next/server";
import { createAdminClient } from "@/src/lib/supabase/admin";
import { processReplyForLetter } from "@/src/lib/server/processReplyForLetter";

type CronResponse = {
  error?: string;
  failed?: number;
  processed?: number;
  success: boolean;
};

const batchSize = 10;

function json(body: CronResponse, status = 200) {
  return NextResponse.json(body, { status });
}

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  return Boolean(secret) && authorization === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return json({ success: false, error: "Unauthorized." }, 401);
  }

  const supabase = await createAdminClient();
  const now = new Date().toISOString();
  const pendingLetterConditions = {
    limit: batchSize,
    order: "scheduled_reply_at asc",
    reply_generated: false,
    scheduled_reply_at_lte: now,
    status: "pending",
  };

  console.log("[reply-cron] Supabase URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("[reply-cron] now", now);
  console.log("[reply-cron] pending letters query conditions", pendingLetterConditions);

  const { data: letters, error } = await supabase
    .from("letters")
    .select("id")
    .eq("status", "pending")
    .eq("reply_generated", false)
    .lte("scheduled_reply_at", now)
    .order("scheduled_reply_at", { ascending: true })
    .limit(batchSize);

  if (error) {
    console.error("Failed to query due letters for reply cron", error);
    return json({ success: false, error: error.message }, 500);
  }

  console.log("[reply-cron] pending letters length", letters?.length ?? 0);

  if ((letters?.length ?? 0) === 0) {
    const { data: recentLetters, error: recentLettersError } = await supabase
      .from("letters")
      .select("id, status, scheduled_reply_at, reply_generated")
      .order("created_at", { ascending: false })
      .limit(5);

    if (recentLettersError) {
      console.error("[reply-cron] failed to query recent letters", recentLettersError);
    } else {
      console.log("[reply-cron] recent 5 letters", recentLetters ?? []);
    }
  }

  let processed = 0;
  let failed = 0;

  for (const letter of letters ?? []) {
    const letterId = (letter as { id?: unknown }).id;

    if (typeof letterId !== "string") {
      failed += 1;
      console.error("Reply cron found a letter row without a string id", letter);
      continue;
    }

    try {
      await processReplyForLetter(letterId, {
        force: false,
        revalidate: false,
        supabase,
      });
      processed += 1;
    } catch (error) {
      failed += 1;
      console.error(`Failed to process scheduled reply for letter ${letterId}`, error);
    }
  }

  return json({
    success: true,
    processed,
    failed,
  });
}

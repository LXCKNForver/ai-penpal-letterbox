import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { generateReply } from "@/lib/ai/generateReply";
import { createClient } from "@/lib/supabase/server";
import { getPenpalMemories } from "@/src/lib/db/memories";
import { mapPenpalRow, type PenpalRow } from "@/src/lib/db/penpals";
import { ensureUserPenpal } from "@/src/lib/db/userPenpals";

type GenerateReplyBody = {
  force?: unknown;
  letterId?: unknown;
};

type LetterRow = {
  content: string;
  id: string;
  penpal_id: string;
  reply_generated: boolean | null;
  scheduled_reply_at: string | null;
  status: string | null;
  user_id: string;
};

type GenerateReplyResponse = {
  alreadyExists?: boolean;
  error?: string;
  penpalId?: string;
  reason?: string;
  replyId?: string;
  success: boolean;
};

const penpalSelect =
  "id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y";

function getTime(value: string | null) {
  if (!value) {
    return null;
  }

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? null : time;
}

function json(body: GenerateReplyResponse, status = 200) {
  return NextResponse.json(body, { status });
}

function revalidateReplyViews(replyId: string) {
  revalidatePath("/inbox");
  revalidatePath("/discover");
  revalidatePath("/letters");
  revalidatePath("/profile");
  revalidatePath(`/letters/reply/${replyId}`);
}

export async function POST(request: Request) {
  let body: GenerateReplyBody;

  try {
    body = (await request.json()) as GenerateReplyBody;
  } catch (error) {
    return json(
      {
        success: false,
        reason: "invalid_body",
        error: error instanceof Error ? error.message : "Invalid JSON body.",
      },
      400
    );
  }

  if (typeof body.letterId !== "string" || body.letterId.trim().length === 0) {
    return json(
      {
        success: false,
        reason: "invalid_letter_id",
        error: "letterId is required.",
      },
      400
    );
  }

  const force = body.force === true;
  const letterId = body.letterId.trim();
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return json(
      {
        success: false,
        reason: "unauthenticated",
        error: userError?.message ?? "请先登录。",
      },
      401
    );
  }

  const { data: letterData, error: letterError } = await supabase
    .from("letters")
    .select("id, user_id, penpal_id, content, status, scheduled_reply_at, reply_generated")
    .eq("id", letterId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (letterError) {
    return json(
      {
        success: false,
        reason: "letter_query_failed",
        error: letterError.message,
      },
      500
    );
  }

  if (!letterData) {
    return json(
      {
        success: false,
        reason: "letter_not_found",
        error: "没有找到这封信。",
      },
      404
    );
  }

  const letter = letterData as LetterRow;

  if (letter.status === "replied" || letter.reply_generated === true) {
    const { data: existingReply, error: existingReplyError } = await supabase
      .from("replies")
      .select("id")
      .eq("letter_id", letter.id)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingReplyError) {
      return json(
        {
          success: false,
          reason: "reply_query_failed",
          error: existingReplyError.message,
        },
        500
      );
    }

    if (existingReply) {
      const replyId = existingReply.id as string;

      try {
        await ensureUserPenpal({ userId: user.id, penpalId: letter.penpal_id });
      } catch (error) {
        return json(
          {
            success: false,
            reason: "user_penpal_insert_failed",
            replyId,
            error: error instanceof Error ? error.message : "Failed to ensure user penpal.",
          },
          500
        );
      }

      revalidateReplyViews(replyId);

      return json({
        alreadyExists: true,
        penpalId: letter.penpal_id,
        replyId,
        success: true,
      });
    }

    return json(
      {
        success: false,
        reason: "existing_reply_not_found",
        error: "这封信已标记为已回复，但没有找到对应回信。",
      },
      409
    );
  }

  const scheduledReplyAt = getTime(letter.scheduled_reply_at);

  if (!force && scheduledReplyAt && scheduledReplyAt > Date.now()) {
    return json({ success: false, reason: "too_early" });
  }

  const { data: existingReply, error: existingReplyError } = await supabase
    .from("replies")
    .select("id")
    .eq("letter_id", letter.id)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingReplyError) {
    return json(
      {
        success: false,
        reason: "reply_query_failed",
        error: existingReplyError.message,
      },
      500
    );
  }

  if (existingReply) {
    const replyId = existingReply.id as string;

    try {
      await ensureUserPenpal({ userId: user.id, penpalId: letter.penpal_id });
    } catch (error) {
      return json(
        {
          success: false,
          reason: "user_penpal_insert_failed",
          replyId,
          error: error instanceof Error ? error.message : "Failed to ensure user penpal.",
        },
        500
      );
    }

    const { error: updateError } = await supabase
      .from("letters")
      .update({ status: "replied", reply_generated: true })
      .eq("id", letter.id)
      .eq("user_id", user.id);

    if (updateError) {
      return json(
        {
          success: false,
          reason: "letter_update_failed",
          replyId,
          error: updateError.message,
        },
        500
      );
    }

    revalidateReplyViews(replyId);

    return json({
      alreadyExists: true,
      penpalId: letter.penpal_id,
      replyId,
      success: true,
    });
  }

  const { data: penpalData, error: penpalError } = await supabase
    .from("penpals")
    .select(penpalSelect)
    .eq("id", letter.penpal_id)
    .maybeSingle();

  if (penpalError) {
    return json(
      {
        success: false,
        reason: "penpal_query_failed",
        error: penpalError.message,
      },
      500
    );
  }

  if (!penpalData) {
    return json(
      {
        success: false,
        reason: "penpal_not_found",
        error: "没有找到这封信的隐藏收信人。",
      },
      404
    );
  }

  const penpal = mapPenpalRow(penpalData as PenpalRow);
  const memories = await getPenpalMemories(letter.user_id, letter.penpal_id);
  let generated: Awaited<ReturnType<typeof generateReply>>;

  try {
    generated = await generateReply({
      penpal,
      letter: { content: letter.content },
      memories,
      mode: "deepseek",
    });
  } catch (error) {
    return json(
      {
        success: false,
        reason: "reply_generation_failed",
        error:
          error instanceof Error
            ? error.message
            : "DeepSeek reply generation failed.",
      },
      500
    );
  }

  const { data: replyData, error: insertError } = await supabase
    .from("replies")
    .insert({
      content: generated.content,
      is_read: false,
      letter_id: letter.id,
      penpal_id: letter.penpal_id,
      user_id: letter.user_id,
    })
    .select("id")
    .single();

  if (insertError || !replyData) {
    return json(
      {
        success: false,
        reason: "reply_insert_failed",
        error: insertError?.message ?? "Reply insert returned no data.",
      },
      500
    );
  }

  const replyId = replyData.id as string;

  try {
    await ensureUserPenpal({ userId: user.id, penpalId: letter.penpal_id });
  } catch (error) {
    return json(
      {
        success: false,
        reason: "user_penpal_insert_failed",
        replyId,
        error: error instanceof Error ? error.message : "Failed to ensure user penpal.",
      },
      500
    );
  }

  const { error: updateError } = await supabase
    .from("letters")
    .update({ status: "replied", reply_generated: true })
    .eq("id", letter.id)
    .eq("user_id", user.id);

  if (updateError) {
    return json(
      {
        success: false,
        reason: "letter_update_failed",
        replyId,
        error: updateError.message,
      },
      500
    );
  }

  revalidateReplyViews(replyId);

  return json({
    penpalId: letter.penpal_id,
    replyId,
    success: true,
  });
}

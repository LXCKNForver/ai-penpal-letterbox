import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  ProcessReplyForLetterError,
  processReplyForLetter,
} from "@/src/lib/server/processReplyForLetter";

type GenerateReplyBody = {
  force?: unknown;
  letterId?: unknown;
};

type GenerateReplyResponse = {
  alreadyExists?: boolean;
  error?: string;
  penpalId?: string;
  reason?: string;
  replyId?: string;
  success: boolean;
};

function json(body: GenerateReplyResponse, status = 200) {
  return NextResponse.json(body, { status });
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

  try {
    const result = await processReplyForLetter(body.letterId.trim(), {
      force: body.force === true,
      supabase,
      userId: user.id,
    });

    return json({
      alreadyExists: result.alreadyExists,
      penpalId: result.penpalId,
      replyId: result.replyId,
      success: true,
    });
  } catch (error) {
    if (error instanceof ProcessReplyForLetterError) {
      return json(
        {
          success: false,
          reason: error.reason,
          error: error.message,
        },
        error.status
      );
    }

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
}

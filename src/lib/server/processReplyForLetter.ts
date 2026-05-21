import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { generateReply } from "@/lib/ai/generateReply";
import { createClient } from "@/lib/supabase/server";
import type { PenpalMemory, PenpalMemoryType } from "@/src/lib/db/memories";
import { mapPenpalRow, type PenpalRow } from "@/src/lib/db/penpals";

type LetterRow = {
  content: string;
  id: string;
  penpal_id: string;
  reply_generated: boolean | null;
  scheduled_reply_at: string | null;
  status: string | null;
  user_id: string;
};

type PenpalMemoryRow = {
  id: string;
  user_id: string;
  penpal_id: string;
  memory_type: PenpalMemoryType | string | null;
  content: string;
  importance: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ProcessReplyForLetterResult = {
  alreadyExists?: boolean;
  penpalId: string;
  replyId: string;
};

type ProcessReplyForLetterOptions = {
  force?: boolean;
  revalidate?: boolean;
  supabase?: SupabaseClient;
  userId?: string;
};

const letterSelect =
  "id, user_id, penpal_id, content, status, scheduled_reply_at, reply_generated";

const penpalSelect =
  "id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y";

export class ProcessReplyForLetterError extends Error {
  reason: string;
  status: number;

  constructor({
    message,
    reason,
    status = 500,
  }: {
    message: string;
    reason: string;
    status?: number;
  }) {
    super(message);
    this.name = "ProcessReplyForLetterError";
    this.reason = reason;
    this.status = status;
  }
}

function getTime(value: string | null) {
  if (!value) {
    return null;
  }

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? null : time;
}

function normalizeMemoryType(value: string | null): PenpalMemoryType {
  if (
    value === "birthday" ||
    value === "preference" ||
    value === "dislike" ||
    value === "fear" ||
    value === "goal" ||
    value === "life_event" ||
    value === "other"
  ) {
    return value;
  }

  return "other";
}

function mapMemoryRow(row: PenpalMemoryRow): PenpalMemory {
  return {
    id: row.id,
    userId: row.user_id,
    penpalId: row.penpal_id,
    memoryType: normalizeMemoryType(row.memory_type),
    content: row.content,
    importance: row.importance ?? 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function revalidateReplyViews(replyId: string) {
  revalidatePath("/inbox");
  revalidatePath("/discover");
  revalidatePath("/letters");
  revalidatePath("/profile");
  revalidatePath(`/letters/reply/${replyId}`);
}

async function findLatestReplyId({
  letterId,
  supabase,
  userId,
}: {
  letterId: string;
  supabase: SupabaseClient;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("replies")
    .select("id")
    .eq("letter_id", letterId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new ProcessReplyForLetterError({
      message: error.message,
      reason: "reply_query_failed",
    });
  }

  return data ? (data.id as string) : null;
}

async function ensureUserPenpal({
  penpalId,
  supabase,
  userId,
}: {
  penpalId: string;
  supabase: SupabaseClient;
  userId: string;
}) {
  const { data: existing, error: lookupError } = await supabase
    .from("user_penpals")
    .select("penpal_id")
    .eq("user_id", userId)
    .eq("penpal_id", penpalId)
    .maybeSingle();

  if (lookupError) {
    throw new ProcessReplyForLetterError({
      message: lookupError.message,
      reason: "user_penpal_query_failed",
    });
  }

  if (existing) {
    return;
  }

  const { error: insertError } = await supabase.from("user_penpals").insert({
    user_id: userId,
    penpal_id: penpalId,
    discovered_at: new Date().toISOString(),
    is_active: true,
  });

  if (
    insertError?.code === "42703" ||
    insertError?.code === "PGRST204" ||
    insertError?.message.includes("discovered_at") ||
    insertError?.message.includes("is_active")
  ) {
    const { error: fallbackError } = await supabase.from("user_penpals").insert({
      user_id: userId,
      penpal_id: penpalId,
    });

    if (fallbackError && fallbackError.code !== "23505") {
      throw new ProcessReplyForLetterError({
        message: fallbackError.message,
        reason: "user_penpal_insert_failed",
      });
    }

    return;
  }

  if (insertError && insertError.code !== "23505") {
    throw new ProcessReplyForLetterError({
      message: insertError.message,
      reason: "user_penpal_insert_failed",
    });
  }
}

async function getMemories({
  penpalId,
  supabase,
  userId,
}: {
  penpalId: string;
  supabase: SupabaseClient;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("penpal_memories")
    .select("id, user_id, penpal_id, memory_type, content, importance, created_at, updated_at")
    .eq("user_id", userId)
    .eq("penpal_id", penpalId)
    .order("importance", { ascending: false })
    .order("updated_at", { ascending: false })
    .limit(10);

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapMemoryRow(row as PenpalMemoryRow));
}

export async function processReplyForLetter(
  letterId: string,
  options: ProcessReplyForLetterOptions = {}
): Promise<ProcessReplyForLetterResult> {
  const supabase = options.supabase ?? (await createClient());
  const letterQuery = supabase.from("letters").select(letterSelect).eq("id", letterId);

  if (options.userId) {
    letterQuery.eq("user_id", options.userId);
  }

  const { data: letterData, error: letterError } = await letterQuery.maybeSingle();

  if (letterError) {
    throw new ProcessReplyForLetterError({
      message: letterError.message,
      reason: "letter_query_failed",
    });
  }

  if (!letterData) {
    throw new ProcessReplyForLetterError({
      message: "没有找到这封信。",
      reason: "letter_not_found",
      status: 404,
    });
  }

  const letter = letterData as LetterRow;

  if (letter.status === "replied" || letter.reply_generated === true) {
    const existingReplyId = await findLatestReplyId({
      letterId: letter.id,
      supabase,
      userId: letter.user_id,
    });

    if (!existingReplyId) {
      throw new ProcessReplyForLetterError({
        message: "这封信已标记为已回复，但没有找到对应回信。",
        reason: "existing_reply_not_found",
        status: 409,
      });
    }

    await ensureUserPenpal({
      userId: letter.user_id,
      penpalId: letter.penpal_id,
      supabase,
    });

    if (options.revalidate !== false) {
      revalidateReplyViews(existingReplyId);
    }

    return {
      alreadyExists: true,
      penpalId: letter.penpal_id,
      replyId: existingReplyId,
    };
  }

  const scheduledReplyAt = getTime(letter.scheduled_reply_at);

  if (!options.force && scheduledReplyAt && scheduledReplyAt > Date.now()) {
    throw new ProcessReplyForLetterError({
      message: "这封信还没有到回信时间。",
      reason: "too_early",
      status: 200,
    });
  }

  const existingReplyId = await findLatestReplyId({
    letterId: letter.id,
    supabase,
    userId: letter.user_id,
  });

  if (existingReplyId) {
    await ensureUserPenpal({
      userId: letter.user_id,
      penpalId: letter.penpal_id,
      supabase,
    });

    const { error: updateError } = await supabase
      .from("letters")
      .update({ status: "replied", reply_generated: true })
      .eq("id", letter.id)
      .eq("user_id", letter.user_id);

    if (updateError) {
      throw new ProcessReplyForLetterError({
        message: updateError.message,
        reason: "letter_update_failed",
      });
    }

    if (options.revalidate !== false) {
      revalidateReplyViews(existingReplyId);
    }

    return {
      alreadyExists: true,
      penpalId: letter.penpal_id,
      replyId: existingReplyId,
    };
  }

  const { data: penpalData, error: penpalError } = await supabase
    .from("penpals")
    .select(penpalSelect)
    .eq("id", letter.penpal_id)
    .maybeSingle();

  if (penpalError) {
    throw new ProcessReplyForLetterError({
      message: penpalError.message,
      reason: "penpal_query_failed",
    });
  }

  if (!penpalData) {
    throw new ProcessReplyForLetterError({
      message: "没有找到这封信的隐藏收信人。",
      reason: "penpal_not_found",
      status: 404,
    });
  }

  const penpal = mapPenpalRow(penpalData as PenpalRow);
  const memories = await getMemories({
    userId: letter.user_id,
    penpalId: letter.penpal_id,
    supabase,
  });

  let generated: Awaited<ReturnType<typeof generateReply>>;

  try {
    generated = await generateReply({
      penpal,
      letter: { content: letter.content },
      memories,
      mode: "deepseek",
    });
  } catch (error) {
    throw new ProcessReplyForLetterError({
      message:
        error instanceof Error
          ? `DeepSeek reply generation failed: ${error.message}`
          : "DeepSeek reply generation failed.",
      reason: "reply_generation_failed",
    });
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
    throw new ProcessReplyForLetterError({
      message: insertError?.message ?? "Reply insert returned no data.",
      reason: "reply_insert_failed",
    });
  }

  const replyId = replyData.id as string;

  await ensureUserPenpal({
    userId: letter.user_id,
    penpalId: letter.penpal_id,
    supabase,
  });

  const { error: updateError } = await supabase
    .from("letters")
    .update({ status: "replied", reply_generated: true })
    .eq("id", letter.id)
    .eq("user_id", letter.user_id);

  if (updateError) {
    throw new ProcessReplyForLetterError({
      message: updateError.message,
      reason: "letter_update_failed",
    });
  }

  if (options.revalidate !== false) {
    revalidateReplyViews(replyId);
  }

  return {
    penpalId: letter.penpal_id,
    replyId,
  };
}

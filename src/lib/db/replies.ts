import { createClient } from "@/lib/supabase/server";
import { generateReply } from "@/lib/ai/generateReply";
import { getPenpalMemories } from "@/src/lib/db/memories";
import {
  mapPenpalRow,
  type Penpal,
  type PenpalRow,
} from "@/src/lib/db/penpals";
import { ensureUserPenpal } from "@/src/lib/db/userPenpals";
import type { LetterStatus } from "@/types/letter";

type ReplyRow = {
  id: string;
  letter_id: string;
  user_id: string;
  penpal_id: string;
  content: string;
  is_read: boolean | null;
  created_at: string | null;
  penpals: PenpalRow | PenpalRow[] | null;
};

type LetterRow = {
  id: string;
  user_id: string;
  penpal_id: string;
  content: string;
  status: LetterStatus | string | null;
  created_at: string | null;
  penpals: PenpalRow | PenpalRow[] | null;
};

export type ReplyWithPenpal = {
  id: string;
  letterId: string;
  userId: string;
  penpalId: string;
  content: string;
  isRead: boolean;
  createdAt: string | null;
  penpal: Penpal;
};

const penpalSelect =
  "id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y";

const replySelect = `id, letter_id, user_id, penpal_id, content, is_read, created_at, penpals(${penpalSelect})`;

function unwrapPenpal(row: ReplyRow | LetterRow) {
  return Array.isArray(row.penpals) ? row.penpals[0] : row.penpals;
}

function mapReplyRow(row: ReplyRow, index = 0): ReplyWithPenpal | null {
  const penpal = unwrapPenpal(row);

  if (!penpal) {
    return null;
  }

  return {
    id: row.id,
    letterId: row.letter_id,
    userId: row.user_id,
    penpalId: row.penpal_id,
    content: row.content,
    isRead: Boolean(row.is_read),
    createdAt: row.created_at,
    penpal: mapPenpalRow(penpal, index),
  };
}

export async function createReply({
  letterId,
  userId,
  penpalId,
  content,
}: {
  letterId: string;
  userId: string;
  penpalId: string;
  content: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("replies")
    .insert({
      letter_id: letterId,
      user_id: userId,
      penpal_id: penpalId,
      content,
      is_read: false,
    })
    .select(replySelect)
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "回信没有成功落进信箱。");
  }

  const reply = mapReplyRow(data as ReplyRow);

  if (!reply) {
    throw new Error("回信已经生成，但没有找到对应的笔友信息。");
  }

  return reply;
}

export async function getRepliesByUser(userId: string): Promise<ReplyWithPenpal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("replies")
    .select(replySelect)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data
    .map((row, index) => mapReplyRow(row as ReplyRow, index))
    .filter((reply): reply is ReplyWithPenpal => Boolean(reply));
}

export async function getReplyByLetterId({
  letterId,
  userId,
}: {
  letterId: string;
  userId: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("replies")
    .select(replySelect)
    .eq("letter_id", letterId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapReplyRow(data as ReplyRow);
}

export async function getReplyById({
  replyId,
  userId,
}: {
  replyId: string;
  userId: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("replies")
    .select(replySelect)
    .eq("id", replyId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapReplyRow(data as ReplyRow);
}

export async function markReplyAsRead({
  replyId,
  userId,
}: {
  replyId: string;
  userId: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("replies")
    .update({ is_read: true })
    .eq("id", replyId)
    .eq("user_id", userId)
    .select("id, is_read")
    .maybeSingle();

  if (error || !data) {
    throw new Error(error?.message ?? "回信已读状态没有成功更新。");
  }
}

export async function createReplyForLetter(letterId: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("请先登录，再模拟收到这封回信。");
  }

  const existingReply = await getReplyByLetterId({ letterId, userId: user.id });

  if (existingReply) {
    await markLetterAsReplied({ letterId, userId: user.id });
    await ensureUserPenpal({ userId: user.id, penpalId: existingReply.penpalId });
    return existingReply;
  }

  const { data: letterData, error: letterError } = await supabase
    .from("letters")
    .select(`id, user_id, penpal_id, content, status, created_at, penpals(${penpalSelect})`)
    .eq("id", letterId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (letterError || !letterData) {
    throw new Error("没有找到这封正在等待回信的信。");
  }

  const letter = letterData as LetterRow;
  const penpalRow = unwrapPenpal(letter);

  if (!penpalRow) {
    throw new Error("没有找到这封信的收信笔友。");
  }

  const penpal = mapPenpalRow(penpalRow);
  const memories = await getPenpalMemories(letter.user_id, letter.penpal_id);
  const generated = await generateReply({
    penpal,
    letter: {
      content: letter.content,
    },
    memories,
    mode: "deepseek",
  });

  const reply = await createReply({
    letterId: letter.id,
    userId: user.id,
    penpalId: letter.penpal_id,
    content: generated.content,
  });

  await markLetterAsReplied({ letterId: letter.id, userId: user.id });
  await ensureUserPenpal({ userId: user.id, penpalId: letter.penpal_id });

  return reply;
}

async function markLetterAsReplied({
  letterId,
  userId,
}: {
  letterId: string;
  userId: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("letters")
    .update({
      status: "replied",
      reply_generated: true,
    })
    .eq("id", letterId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

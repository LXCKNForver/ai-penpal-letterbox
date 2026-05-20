import { createClient } from "@/lib/supabase/server";
import {
  mapPenpalRow,
  type PenpalRow,
} from "@/src/lib/db/penpals";
import type { LetterStatus, LetterWithPenpal } from "@/types/letter";

type LetterRow = {
  id: string;
  user_id: string;
  penpal_id: string;
  content: string;
  status: LetterStatus | string | null;
  scheduled_reply_at: string | null;
  reply_generated: boolean | null;
  created_at: string | null;
  penpals: PenpalRow | PenpalRow[] | null;
};

const letterSelect =
  "id, user_id, penpal_id, content, status, scheduled_reply_at, reply_generated, created_at, penpals(id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y)";

export function createScheduledReplyAt() {
  const minHours = 18;
  const maxHours = 30;
  const hours = minHours + Math.random() * (maxHours - minHours);

  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

function normalizeStatus(status: LetterRow["status"]): LetterStatus {
  if (status === "replied" || status === "failed") {
    return status;
  }

  return "pending";
}

function unwrapPenpal(row: LetterRow) {
  return Array.isArray(row.penpals) ? row.penpals[0] : row.penpals;
}

function mapLetterRow(row: LetterRow, index = 0): LetterWithPenpal | null {
  const penpal = unwrapPenpal(row);

  if (!penpal) {
    return null;
  }

  return {
    id: row.id,
    userId: row.user_id,
    penpalId: row.penpal_id,
    content: row.content,
    status: normalizeStatus(row.status),
    scheduledReplyAt: row.scheduled_reply_at,
    replyGenerated: Boolean(row.reply_generated),
    createdAt: row.created_at,
    penpal: mapPenpalRow(penpal, index),
  };
}

export async function createLetter({
  userId,
  penpalId,
  content,
}: {
  userId: string;
  penpalId: string;
  content: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .insert({
      user_id: userId,
      penpal_id: penpalId,
      content,
      status: "pending",
      scheduled_reply_at: createScheduledReplyAt(),
      reply_generated: false,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "\u4fe1\u4ef6\u6ca1\u6709\u6210\u529f\u5bc4\u51fa\u3002");
  }

  return data.id as string;
}

export async function getUserLetters(userId: string): Promise<LetterWithPenpal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .select(letterSelect)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data
    .map((row, index) => mapLetterRow(row as LetterRow, index))
    .filter((letter): letter is LetterWithPenpal => Boolean(letter));
}

export async function getUserLetterById(userId: string, letterId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .select(letterSelect)
    .eq("user_id", userId)
    .eq("id", letterId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapLetterRow(data as LetterRow);
}

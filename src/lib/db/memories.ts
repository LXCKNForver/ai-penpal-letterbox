import { createClient } from "@/lib/supabase/server";

export type PenpalMemoryType =
  | "birthday"
  | "preference"
  | "dislike"
  | "fear"
  | "goal"
  | "life_event"
  | "other";

export type PenpalMemory = {
  id: string;
  userId: string;
  penpalId: string;
  memoryType: PenpalMemoryType;
  content: string;
  importance: number;
  createdAt: string | null;
  updatedAt: string | null;
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

type MemoryCandidate = {
  content: string;
  importance: number;
  memoryType: PenpalMemoryType;
};

const memoryRules: Array<{
  importance: number;
  keywords: string[];
  memoryType: PenpalMemoryType;
}> = [
  {
    importance: 5,
    keywords: ["我生日是", "我的生日"],
    memoryType: "birthday",
  },
  {
    importance: 4,
    keywords: ["我最喜欢", "我喜欢"],
    memoryType: "preference",
  },
  {
    importance: 4,
    keywords: ["我讨厌"],
    memoryType: "dislike",
  },
  {
    importance: 4,
    keywords: ["我害怕"],
    memoryType: "fear",
  },
  {
    importance: 4,
    keywords: ["我想去"],
    memoryType: "goal",
  },
  {
    importance: 3,
    keywords: ["我正在准备"],
    memoryType: "life_event",
  },
];

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

function normalizeContent(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 120);
}

function splitIntoSentences(content: string) {
  return content
    .split(/[\n。！？!?；;]/)
    .map((sentence) => normalizeContent(sentence))
    .filter(Boolean);
}

function extractMemoryCandidates(letterContent: string): MemoryCandidate[] {
  const seen = new Set<string>();
  const candidates: MemoryCandidate[] = [];

  for (const sentence of splitIntoSentences(letterContent)) {
    for (const rule of memoryRules) {
      if (!rule.keywords.some((keyword) => sentence.includes(keyword))) {
        continue;
      }

      if (seen.has(sentence)) {
        break;
      }

      seen.add(sentence);
      candidates.push({
        content: sentence,
        importance: rule.importance,
        memoryType: rule.memoryType,
      });
      break;
    }
  }

  return candidates;
}

export async function getPenpalMemories(
  userId: string,
  penpalId: string
): Promise<PenpalMemory[]> {
  const supabase = await createClient();
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

export async function createPenpalMemory({
  userId,
  penpalId,
  memoryType,
  content,
  importance,
}: {
  userId: string;
  penpalId: string;
  memoryType: PenpalMemoryType;
  content: string;
  importance: number;
}) {
  const normalizedContent = normalizeContent(content);

  if (!normalizedContent) {
    return null;
  }

  const supabase = await createClient();
  const { data: existing, error: lookupError } = await supabase
    .from("penpal_memories")
    .select("id")
    .eq("user_id", userId)
    .eq("penpal_id", penpalId)
    .eq("content", normalizedContent)
    .maybeSingle();

  if (lookupError) {
    throw new Error(lookupError.message);
  }

  if (existing) {
    return existing.id as string;
  }

  const { data, error } = await supabase
    .from("penpal_memories")
    .insert({
      user_id: userId,
      penpal_id: penpalId,
      memory_type: memoryType,
      content: normalizedContent,
      importance,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Memory insert returned no data.");
  }

  return data.id as string;
}

export async function extractMemoriesFromLetter({
  userId,
  penpalId,
  letterContent,
}: {
  userId: string;
  penpalId: string;
  letterContent: string;
}) {
  const candidates = extractMemoryCandidates(letterContent);

  if (candidates.length === 0) {
    return [];
  }

  const memoryIds: string[] = [];

  for (const candidate of candidates) {
    const memoryId = await createPenpalMemory({
      userId,
      penpalId,
      memoryType: candidate.memoryType,
      content: candidate.content,
      importance: candidate.importance,
    });

    if (memoryId) {
      memoryIds.push(memoryId);
    }
  }

  return memoryIds;
}

import { createClient } from "@/lib/supabase/server";
import {
  findMockPenpal,
  mockPenpals,
  type MockPenpal,
} from "@/src/lib/mock/penpals";

export type PenpalRow = {
  id: string;
  name: string;
  age: number | null;
  country: string | null;
  city: string | null;
  avatar_label: string | null;
  intro: string | null;
  quote: string | null;
  room_description: string | null;
  favorite_things: string[] | string | null;
  topics: string[] | string | null;
  map_x: number | string | null;
  map_y: number | string | null;
};

export type Penpal = MockPenpal;

const fallbackColors = ["#8c9a63", "#8aa1aa", "#c58f7a", "#9b7d61", "#7f8f74"];

function toStringArray(value: string[] | string | null | undefined) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean).map(String);
    }
  } catch {
    return value
      .split(/[,\uff0c]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function toPercent(value: number | string | null | undefined, fallback: string) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  if (numberValue >= 0 && numberValue <= 1) {
    return `${Math.round(numberValue * 100)}%`;
  }

  return `${Math.max(0, Math.min(100, numberValue))}%`;
}

function colorForId(id: string) {
  const total = Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return fallbackColors[total % fallbackColors.length];
}

export function mapPenpalRow(row: PenpalRow, index = 0): Penpal {
  const fallback = findMockPenpal(row.id) ?? mockPenpals[index % mockPenpals.length];
  const favoriteThings = toStringArray(row.favorite_things);
  const topics = toStringArray(row.topics);
  const country = row.country ?? fallback?.country ?? "";
  const city = row.city ?? fallback?.city ?? "";
  const avatarLabel = row.avatar_label ?? fallback?.avatarLabel ?? row.name.slice(0, 2);

  return {
    id: row.id,
    name: row.name,
    age: row.age ?? fallback?.age ?? 0,
    country,
    city,
    location: country && city ? `${country} \u00b7 ${city}` : country || city,
    avatar: avatarLabel,
    avatarLabel,
    bio: row.intro ?? fallback?.bio ?? "",
    intro: row.intro ?? fallback?.intro ?? "",
    quote: row.quote ?? fallback?.quote ?? "",
    roomDescription: row.room_description ?? fallback?.roomDescription ?? "",
    favoriteThings: favoriteThings.length > 0 ? favoriteThings : fallback?.favoriteThings ?? [],
    topics: topics.length > 0 ? topics : fallback?.topics ?? [],
    tags:
      topics.length > 0
        ? topics.slice(0, 3)
        : favoriteThings.length > 0
          ? favoriteThings.slice(0, 3)
          : fallback?.tags ?? [],
    relationshipStats: fallback?.relationshipStats ?? {
      knownDays: 0,
      lettersReceived: 0,
      lettersSent: 0,
    },
    recentLetters: fallback?.recentLetters ?? [],
    color: fallback?.color ?? colorForId(row.id),
    mapPosition: {
      top: toPercent(row.map_y, fallback?.mapPosition.top ?? "45%"),
      left: toPercent(row.map_x, fallback?.mapPosition.left ?? "50%"),
    },
  };
}

export async function getPenpals(): Promise<Penpal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("penpals")
    .select(
      "id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y"
    )
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    return mockPenpals;
  }

  return data.map((row, index) => mapPenpalRow(row as PenpalRow, index));
}

export async function getPenpalById(id: string): Promise<Penpal | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("penpals")
    .select(
      "id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return findMockPenpal(id);
  }

  return mapPenpalRow(data as PenpalRow);
}

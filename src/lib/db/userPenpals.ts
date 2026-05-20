import { createClient } from "@/lib/supabase/server";
import {
  mapPenpalRow,
  type Penpal,
  type PenpalRow,
} from "@/src/lib/db/penpals";

type UserPenpalRow = {
  discovered_at?: string | null;
  penpal_id: string;
  penpals?: PenpalRow | PenpalRow[] | null;
};

export type UserPenpalDiscovery = {
  discoveredAt: string | null;
  penpalId: string;
};

function unwrapPenpal(row: UserPenpalRow, index: number) {
  const penpal = Array.isArray(row.penpals) ? row.penpals[0] : row.penpals;

  return penpal ? mapPenpalRow(penpal, index) : null;
}

export async function getUserPenpals(userId: string): Promise<Penpal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_penpals")
    .select(
      "penpal_id, penpals(id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y)"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data
    .map((row, index) => unwrapPenpal(row as UserPenpalRow, index))
    .filter((penpal): penpal is Penpal => Boolean(penpal));
}

export async function getUserPenpalDiscoveries(
  userId: string
): Promise<UserPenpalDiscovery[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_penpals")
    .select("penpal_id, discovered_at")
    .eq("user_id", userId);

  if (error) {
    const { data: fallbackData, error: fallbackError } = await supabase
      .from("user_penpals")
      .select("penpal_id")
      .eq("user_id", userId);

    if (fallbackError || !fallbackData) {
      return [];
    }

    return fallbackData.map((row) => ({
      discoveredAt: null,
      penpalId: (row as UserPenpalRow).penpal_id,
    }));
  }

  if (!data) {
    return [];
  }

  return data.map((row) => {
    const userPenpal = row as UserPenpalRow;

    return {
      discoveredAt: userPenpal.discovered_at ?? null,
      penpalId: userPenpal.penpal_id,
    };
  });
}

export function isPenpalDiscoveredForLetter({
  discoveredAt,
  letterCreatedAt,
}: {
  discoveredAt: string | null | undefined;
  letterCreatedAt: string | null;
}) {
  if (!discoveredAt) {
    return true;
  }

  if (!letterCreatedAt) {
    return true;
  }

  const discoveredTime = new Date(discoveredAt).getTime();
  const letterTime = new Date(letterCreatedAt).getTime();

  if (Number.isNaN(discoveredTime) || Number.isNaN(letterTime)) {
    return true;
  }

  return discoveredTime <= letterTime;
}

export async function selectHiddenPenpalForUser(userId: string): Promise<Penpal> {
  const supabase = await createClient();
  const [{ data: penpals, error: penpalsError }, { data: discoveredPenpals }] =
    await Promise.all([
      supabase
        .from("penpals")
        .select(
          "id, name, age, country, city, avatar_label, intro, quote, room_description, favorite_things, topics, map_x, map_y"
        ),
      supabase
        .from("user_penpals")
        .select("penpal_id")
        .eq("user_id", userId),
    ]);

  if (penpalsError || !penpals || penpals.length === 0) {
    throw new Error("\u8fd8\u6ca1\u6709\u53ef\u4ee5\u9082\u9005\u7684\u7b14\u53cb\u3002");
  }

  const discoveredIds = new Set(
    (discoveredPenpals ?? []).map((row) => (row as UserPenpalRow).penpal_id)
  );
  const candidates = penpals.filter(
    (penpal) => !discoveredIds.has((penpal as PenpalRow).id)
  );

  if (candidates.length === 0) {
    throw new Error("你已经点亮了目前所有的远方地址。");
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  const selected = candidates[randomIndex] as PenpalRow;

  return mapPenpalRow(selected, randomIndex);
}

export async function ensureUserPenpal({
  userId,
  penpalId,
}: {
  userId: string;
  penpalId: string;
}) {
  const supabase = await createClient();
  const { data: existing, error: lookupError } = await supabase
    .from("user_penpals")
    .select("penpal_id")
    .eq("user_id", userId)
    .eq("penpal_id", penpalId)
    .maybeSingle();

  if (lookupError) {
    throw new Error(lookupError.message);
  }

  if (existing) {
    return;
  }

  const insertPayload = {
    user_id: userId,
    penpal_id: penpalId,
    discovered_at: new Date().toISOString(),
    is_active: true,
  };
  const { error: insertError } = await supabase
    .from("user_penpals")
    .insert(insertPayload);

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
      throw new Error(fallbackError.message);
    }

    return;
  }

  if (insertError && insertError.code !== "23505") {
    throw new Error(insertError.message);
  }
}

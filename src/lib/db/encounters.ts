import { createClient } from "@/lib/supabase/server";

export type EncounterStatus = {
  sentLettersCount: number;
  usedEncounterCount: number;
  availableEncounterCount: number;
  discoveredCount: number;
  totalPenpalCount: number;
  allDiscovered: boolean;
  lettersNeededForNextEncounter: number;
};

function safeCount(count: number | null) {
  return count ?? 0;
}

export async function getEncounterStatus(userId: string): Promise<EncounterStatus> {
  const supabase = await createClient();
  const [
    { count: sentLettersCount },
    { count: usedEncounterCount },
    { count: discoveredCount },
    { count: totalPenpalCount },
  ] = await Promise.all([
    supabase
      .from("letters")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("encounter_logs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("success", true),
    supabase
      .from("user_penpals")
      .select("penpal_id", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase.from("penpals").select("id", { count: "exact", head: true }),
  ]);

  const sentCount = safeCount(sentLettersCount);
  const usedCount = safeCount(usedEncounterCount);
  const discovered = safeCount(discoveredCount);
  const total = safeCount(totalPenpalCount);
  const earnedEncounterCount = Math.floor(sentCount / 2);
  const availableEncounterCount = Math.max(0, earnedEncounterCount - usedCount);

  return {
    sentLettersCount: sentCount,
    usedEncounterCount: usedCount,
    availableEncounterCount,
    discoveredCount: discovered,
    totalPenpalCount: total,
    allDiscovered: total > 0 && discovered >= total,
    lettersNeededForNextEncounter:
      availableEncounterCount > 0 ? 0 : 2 - (sentCount % 2),
  };
}

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getEncounterStatus } from "@/src/lib/db/encounters";
import { createLetter } from "@/src/lib/db/letters";
import { extractMemoriesFromLetter } from "@/src/lib/db/memories";
import { selectHiddenPenpalForUser } from "@/src/lib/db/userPenpals";

type SendUnknownLetterResult = {
  error?: string;
};

export async function sendUnknownLetter(
  content: string
): Promise<SendUnknownLetterResult> {
  const trimmedContent = content.trim();

  if (trimmedContent.length < 8) {
    return { error: "这封信再多写一点点，就能寄向远方了。" };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "请先登录，再把这封信寄出去。" };
  }

  const status = await getEncounterStatus(user.id);

  if (status.allDiscovered) {
    return { error: "你已经点亮了目前所有的远方地址。" };
  }

  if (status.availableEncounterCount <= 0) {
    return { error: "还没有足够的远方信号，再写几封信吧。" };
  }

  let letterId: string;
  let penpalId: string;

  try {
    const penpal = await selectHiddenPenpalForUser(user.id);
    penpalId = penpal.id;
    letterId = await createLetter({
      userId: user.id,
      penpalId,
      content: trimmedContent,
    });

    const { error: logError } = await supabase.from("encounter_logs").insert({
      user_id: user.id,
      penpal_id: penpalId,
      success: true,
      reason: "letter_credit",
    });

    if (logError) {
      throw new Error(logError.message);
    }
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "寄出这封未知远方的信时出了一点小问题。",
    };
  }

  try {
    await extractMemoriesFromLetter({
      userId: user.id,
      penpalId,
      letterContent: trimmedContent,
    });
  } catch (error) {
    console.error("Failed to extract memories from unknown letter", error);
  }

  redirect(`/letters/waiting?letterId=${letterId}`);
}

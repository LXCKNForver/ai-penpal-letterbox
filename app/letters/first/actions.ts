"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createLetter } from "@/src/lib/db/letters";
import { extractMemoriesFromLetter } from "@/src/lib/db/memories";
import { selectHiddenPenpalForUser } from "@/src/lib/db/userPenpals";

type SendFirstLetterResult = {
  error?: string;
};

export async function sendFirstLetter(content: string): Promise<SendFirstLetterResult> {
  const trimmedContent = content.trim();

  if (trimmedContent.length < 8) {
    return { error: "\u8fd9\u5c01\u4fe1\u518d\u591a\u5199\u4e00\u70b9\u70b9\uff0c\u5c31\u80fd\u5bc4\u5411\u8fdc\u65b9\u4e86\u3002" };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "\u8bf7\u5148\u767b\u5f55\uff0c\u518d\u628a\u8fd9\u5c01\u4fe1\u5bc4\u51fa\u53bb\u3002" };
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
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "\u5bc4\u51fa\u4fe1\u4ef6\u65f6\u51fa\u4e86\u4e00\u70b9\u5c0f\u95ee\u9898\u3002",
    };
  }

  try {
    await extractMemoriesFromLetter({
      userId: user.id,
      penpalId,
      letterContent: trimmedContent,
    });
  } catch (error) {
    console.error("Failed to extract memories from first letter", error);
  }

  redirect(`/letters/waiting?letterId=${letterId}`);
}

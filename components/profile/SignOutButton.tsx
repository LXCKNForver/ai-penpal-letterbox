"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ButtonLoading } from "@/src/components/loading";
import { useI18n } from "@/src/i18n/useI18n";

export function SignOutButton() {
  const { t } = useI18n();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/auth/login");
    router.refresh();
  }

  return (
    <button
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-border bg-paper-soft/80 px-5 text-sm font-semibold text-ink-muted shadow-paper transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-55"
      disabled={isLoading}
      onClick={handleSignOut}
      type="button"
    >
      {isLoading ? (
        <ButtonLoading label={t("profile.signOut")} tone="dark" />
      ) : (
        <>
          <LogOut className="size-4" />
          {t("profile.signOut")}
        </>
      )}
    </button>
  );
}

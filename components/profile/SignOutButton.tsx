"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
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
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-button border border-border bg-paper-soft/80 px-5 text-sm font-semibold text-ink-muted shadow-paper transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
      disabled={isLoading}
      onClick={handleSignOut}
      type="button"
    >
      <LogOut className="size-4" />
      {isLoading ? "\u6b63\u5728\u5408\u4e0a\u4fe1\u7bb1..." : "\u79bb\u5f00\u4fe1\u7bb1"}
    </button>
  );
}

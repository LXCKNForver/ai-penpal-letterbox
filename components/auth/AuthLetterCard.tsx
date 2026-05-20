"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Mail, Stamp } from "lucide-react";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";
import { PaperCard } from "@/components/shared/PaperCard";
import { Input } from "@/components/ui/input";
import { WashiTape } from "@/components/decorative/WashiTape";
import { WaxSeal } from "@/components/decorative/WaxSeal";
import { createClient } from "@/lib/supabase/client";

type AuthLetterCardProps = {
  mode: "login" | "register";
};

const copy = {
  login: {
    title: "\u6b22\u8fce\u56de\u5230\u6162\u6162\u4fe1\u7bb1",
    subtitle: "\u8fdc\u65b9\u7684\u56de\u4fe1\uff0c\u6b63\u5728\u7b49\u4f60\u6253\u5f00\u3002",
    button: "\u8fdb\u5165\u4fe1\u7bb1",
    footerText: "\u8fd8\u6ca1\u6709\u4fe1\u7bb1\uff1f",
    footerLink: "\u521b\u5efa\u4e00\u4e2a",
    footerHref: "/auth/register",
  },
  register: {
    title: "\u521b\u5efa\u4f60\u7684\u7b2c\u4e00\u53ea\u4fe1\u7bb1",
    subtitle: "\u4ece\u4eca\u5929\u5f00\u59cb\uff0c\u628a\u5fc3\u4e8b\u6162\u6162\u5bc4\u7ed9\u8fdc\u65b9\u3002",
    button: "\u521b\u5efa\u4fe1\u7bb1",
    footerText: "\u5df2\u7ecf\u6709\u4fe1\u7bb1\u4e86\uff1f",
    footerLink: "\u53bb\u767b\u5f55",
    footerHref: "/auth/login",
  },
};

export function AuthLetterCard({ mode }: AuthLetterCardProps) {
  const router = useRouter();
  const content = copy[mode];
  const isRegister = mode === "register";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nickname = String(formData.get("nickname") ?? "").trim();
    const supabase = createClient();

    if (isRegister && !nickname) {
      setError("\u8bf7\u7ed9\u4f60\u7684\u4fe1\u7bb1\u53d6\u4e00\u4e2a\u6e29\u67d4\u7684\u540d\u5b57\u3002");
      setIsLoading(false);
      return;
    }

    const authResult = isRegister
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname,
            },
          },
        })
      : await supabase.auth.signInWithPassword({
          email,
          password,
        });

    if (authResult.error) {
      setError(authResult.error.message);
      setIsLoading(false);
      return;
    }

    if (isRegister) {
      const userId = authResult.data.user?.id;

      if (!userId) {
        setError("\u6ce8\u518c\u6210\u529f\u524d\u8fd8\u9700\u8981\u786e\u8ba4\u90ae\u7bb1\uff0c\u8bf7\u5148\u6253\u5f00\u90ae\u7bb1\u91cc\u7684\u786e\u8ba4\u4fe1\u3002");
        setIsLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        nickname,
        avatar_url: null,
      });

      if (profileError) {
        setError(profileError.message);
        setIsLoading(false);
        return;
      }
    }

    router.replace("/inbox");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center px-page py-8">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full border border-border bg-paper-soft text-olive-deep shadow-paper">
          <Mail className="size-6" />
        </div>
        <h1 className="text-[26px] font-semibold leading-9 text-ink">{content.title}</h1>
        <p className="mx-auto mt-2 max-w-72 text-sm leading-6 text-ink-muted">
          {content.subtitle}
        </p>
      </div>

      <PaperCard className="relative overflow-visible px-5 py-6">
        <WashiTape className="absolute -top-3 left-10 h-5 w-16 opacity-60" tone="sand" />
        <div className="absolute right-5 top-5 grid size-11 rotate-[8deg] place-items-center rounded-[8px] border border-dashed border-border bg-paper-deep/70 text-[8px] font-semibold text-ink-muted">
          <Stamp className="mb-0.5 size-4 text-olive-deep" />
          MAIL
        </div>

        <form className="space-y-4 pr-10" onSubmit={handleSubmit}>
          {isRegister ? (
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-ink-muted">{"\u6635\u79f0"}</span>
              <Input
                className="h-11 rounded-card border-border bg-paper-soft/70 px-3 text-sm text-ink placeholder:text-ink-muted/45"
                disabled={isLoading}
                name="nickname"
                placeholder={"\u6bd4\u5982\uff1a\u5c0f\u7b14\u53cb"}
                required
                type="text"
              />
            </label>
          ) : null}

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-ink-muted">{"\u90ae\u7bb1"}</span>
            <Input
              className="h-11 rounded-card border-border bg-paper-soft/70 px-3 text-sm text-ink placeholder:text-ink-muted/45"
              disabled={isLoading}
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-ink-muted">{"\u5bc6\u7801"}</span>
            <Input
              className="h-11 rounded-card border-border bg-paper-soft/70 px-3 text-sm text-ink placeholder:text-ink-muted/45"
              disabled={isLoading}
              minLength={6}
              name="password"
              placeholder={"\u8f93\u5165\u4f60\u7684\u5bc6\u7801"}
              required
              type="password"
            />
          </label>

          {error ? (
            <p className="rounded-card border border-stamp-red/25 bg-stamp-red/10 px-3 py-2 text-xs leading-5 text-ink">
              {error}
            </p>
          ) : null}

          <PrimaryActionButton
            className="mt-2 min-h-12 w-full"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "\u6b63\u5728\u6574\u7406\u4fe1\u7bb1..." : content.button}
          </PrimaryActionButton>
        </form>

        <WaxSeal className="absolute -bottom-5 right-8 opacity-90" />
      </PaperCard>

      <p className="mt-8 text-center text-sm text-ink-muted">
        {content.footerText}{" "}
        <Link className="font-semibold text-olive-deep" href={content.footerHref}>
          {content.footerLink}
        </Link>
      </p>
    </div>
  );
}

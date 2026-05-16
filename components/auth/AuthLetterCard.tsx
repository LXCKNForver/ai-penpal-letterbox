"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Stamp } from "lucide-react";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";
import { PaperCard } from "@/components/shared/PaperCard";
import { Input } from "@/components/ui/input";
import { WashiTape } from "@/components/decorative/WashiTape";
import { WaxSeal } from "@/components/decorative/WaxSeal";

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

        <form
          className="space-y-4 pr-10"
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/inbox");
          }}
        >
          {isRegister ? (
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-ink-muted">{"\u6635\u79f0"}</span>
              <Input
                className="h-11 rounded-card border-border bg-paper-soft/70 px-3 text-sm text-ink placeholder:text-ink-muted/45"
                placeholder={"\u6bd4\u5982\uff1a\u5c0f\u7b14\u53cb"}
                type="text"
              />
            </label>
          ) : null}

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-ink-muted">{"\u90ae\u7bb1"}</span>
            <Input
              className="h-11 rounded-card border-border bg-paper-soft/70 px-3 text-sm text-ink placeholder:text-ink-muted/45"
              placeholder="you@example.com"
              type="email"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-ink-muted">{"\u5bc6\u7801"}</span>
            <Input
              className="h-11 rounded-card border-border bg-paper-soft/70 px-3 text-sm text-ink placeholder:text-ink-muted/45"
              placeholder={"\u8f93\u5165\u4f60\u7684\u5bc6\u7801"}
              type="password"
            />
          </label>

          <PrimaryActionButton className="mt-2 min-h-12 w-full" type="submit">
            {content.button}
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

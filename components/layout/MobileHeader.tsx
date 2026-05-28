"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { FloatingSideMenu } from "@/components/menu/FloatingSideMenu";
import type { I18nKey } from "@/src/i18n/config";
import { useI18n } from "@/src/i18n/useI18n";

type MobileHeaderProps = {
  title: string;
  subtitle?: string;
  titleKey?: I18nKey;
  subtitleKey?: I18nKey;
  backHref?: string;
  action?: "menu" | "sparkle" | "none";
  className?: string;
};

export function MobileHeader({
  title,
  subtitle,
  titleKey,
  subtitleKey,
  backHref,
  action = "menu",
  className,
}: MobileHeaderProps) {
  const ActionIcon = action === "sparkle" ? Sparkles : Menu;
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();
  const renderedTitle = titleKey ? t(titleKey) : title;
  const renderedSubtitle = subtitleKey ? t(subtitleKey) : subtitle;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-20 flex items-center justify-between bg-paper/72 px-page pb-3 pt-[calc(1rem+var(--safe-area-top))] backdrop-blur-md",
          className
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          {backHref ? (
            <Link
              href={backHref}
              prefetch
              className="grid size-11 shrink-0 place-items-center rounded-button border border-border bg-paper-soft/80 text-ink shadow-[0_6px_16px_rgba(86,62,33,0.08)] transition active:scale-[0.97] active:opacity-80"
              aria-label={"\u8fd4\u56de"}
            >
              <ArrowLeft className="size-4" />
            </Link>
          ) : null}
          <div className="min-w-0">
            <h1 className="truncate text-[22px] font-semibold tracking-normal text-ink">
              {renderedTitle}
            </h1>
            {renderedSubtitle ? (
              <p className="mt-0.5 truncate text-xs text-ink-muted">{renderedSubtitle}</p>
            ) : null}
          </div>
        </div>
        {action !== "none" ? (
          <button
            className="grid size-11 shrink-0 place-items-center rounded-button border border-border bg-paper-soft/80 text-ink-muted shadow-[0_6px_16px_rgba(86,62,33,0.08)] transition active:scale-[0.97] active:opacity-80"
            type="button"
            aria-label={action === "menu" ? t("sideMenu.ariaOpen") : "\u9875\u9762\u64cd\u4f5c"}
            onClick={() => {
              if (action === "menu") {
                setMenuOpen(true);
              }
            }}
          >
            <ActionIcon className="size-4" />
          </button>
        ) : null}
      </header>
      {action === "menu" ? (
        <FloatingSideMenu open={menuOpen} onOpenChange={setMenuOpen} />
      ) : null}
    </>
  );
}

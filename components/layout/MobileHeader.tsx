import Link from "next/link";
import { ArrowLeft, Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileHeaderProps = {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: "menu" | "sparkle" | "none";
  className?: string;
};

export function MobileHeader({
  title,
  subtitle,
  backHref,
  action = "menu",
  className,
}: MobileHeaderProps) {
  const ActionIcon = action === "sparkle" ? Sparkles : Menu;

  return (
    <header className={cn("flex items-center justify-between px-page pb-3 pt-5", className)}>
      <div className="flex min-w-0 items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="grid size-9 shrink-0 place-items-center rounded-button border border-border bg-paper-soft/80 text-ink"
            aria-label={"\u8fd4\u56de"}
          >
            <ArrowLeft className="size-4" />
          </Link>
        ) : null}
        <div className="min-w-0">
          <h1 className="truncate text-[22px] font-semibold tracking-normal text-ink">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-0.5 truncate text-xs text-ink-muted">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {action !== "none" ? (
        <button
          className="grid size-9 shrink-0 place-items-center rounded-button border border-border bg-paper-soft/80 text-ink-muted"
          type="button"
          aria-label={"\u9875\u9762\u64cd\u4f5c"}
        >
          <ActionIcon className="size-4" />
        </button>
      ) : null}
    </header>
  );
}

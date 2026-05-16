import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagPillProps = {
  children: ReactNode;
  className?: string;
};

export function TagPill({ children, className }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-border bg-paper-deep px-2.5 py-1 text-[11px] text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

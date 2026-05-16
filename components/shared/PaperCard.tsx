import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PaperCardProps = {
  children: ReactNode;
  className?: string;
};

export function PaperCard({ children, className }: PaperCardProps) {
  return (
    <section
      className={cn(
        "relative rounded-card border border-border bg-paper-soft/88 p-card text-ink shadow-paper",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-card before:bg-[linear-gradient(180deg,rgba(255,255,255,0.55),transparent)]",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
}

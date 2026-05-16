import type { ReactNode } from "react";
import { Stamp } from "@/components/decorative/Stamp";
import { WashiTape } from "@/components/decorative/WashiTape";
import { cn } from "@/lib/utils";

type LetterPaperProps = {
  to?: string;
  children: ReactNode;
  className?: string;
};

export function LetterPaper({ to = "Luna", children, className }: LetterPaperProps) {
  return (
    <section
      className={cn(
        "relative min-h-[455px] rounded-paper border border-border/80 bg-paper-soft px-page pb-5 pt-6 shadow-floating",
        className
      )}
    >
      <WashiTape className="absolute -top-2 left-10 h-5 w-16 opacity-70" tone="blue" />
      <Stamp
        className="absolute right-4 top-5 scale-90 rotate-6 opacity-75"
        color="#8aa1aa"
        label="POST"
      />
      <div className="mb-9 max-w-[70%] border-b border-border/70 pb-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">To</p>
        <p className="mt-1 text-lg font-semibold leading-none text-ink">{to}</p>
      </div>
      <div className="rounded-[12px]">{children}</div>
    </section>
  );
}

import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";
import type { InboxLetter } from "@/src/lib/mock/letters";
import { WashiTape } from "@/components/decorative/WashiTape";
import { PaperCard } from "@/components/shared/PaperCard";
import { cn } from "@/lib/utils";

type LetterCardProps = {
  letter: InboxLetter;
  index?: number;
};

function LetterSticker({ color }: { color: string }) {
  return (
    <div className="relative grid size-14 shrink-0 place-items-center rounded-[14px] border border-dashed border-ink-muted/30 bg-paper-soft shadow-[0_7px_14px_rgba(89,64,33,0.10)]">
      <div className="absolute right-1.5 top-1.5 size-3 rounded-[3px] border border-dashed border-border bg-paper-deep" />
      <Mail className="size-6 text-ink-muted" strokeWidth={1.35} />
      <span
        className="absolute -bottom-1.5 rounded-pill border border-paper-soft px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-paper-soft shadow-sm"
        style={{ backgroundColor: color }}
      >
        NEW
      </span>
    </div>
  );
}

export function LetterCard({ letter }: LetterCardProps) {
  const rotateClass = indexRotation(letter.id);

  return (
    <Link href="/replies/demo" className="block">
      <PaperCard
        className={cn(
          "overflow-visible border-border/55 bg-paper-soft/88 p-3.5 shadow-[0_8px_18px_rgba(89,64,33,0.075)] transition active:translate-y-px",
          rotateClass
        )}
      >
        <WashiTape className="absolute -top-2 left-8 h-4 w-14 opacity-45" tone="sand" />
        <span className="absolute right-3 top-2 rounded-pill border border-border/50 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.12em] text-ink-muted/45">
          AIR
        </span>
        <div className="flex items-center gap-3.5">
          <LetterSticker color={letter.stampColor} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-semibold text-ink">{letter.subject}</h2>
              {letter.unread ? (
                <span className="size-2 rounded-full bg-stamp-red" aria-label={"\u672a\u8bfb"} />
              ) : null}
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">{letter.location}</p>
            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-ink-muted">
              {letter.preview}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 text-[11px] text-ink-muted/75">
            {letter.date}
            <ChevronRight className="size-4" />
          </div>
        </div>
      </PaperCard>
    </Link>
  );
}

function indexRotation(id: string) {
  if (id.includes("oliver")) {
    return "rotate-[0.45deg]";
  }

  if (id.includes("xia")) {
    return "rotate-[-0.35deg]";
  }

  return "rotate-[-0.55deg]";
}

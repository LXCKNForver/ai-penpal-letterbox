import { Mail } from "lucide-react";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { PaperCard } from "@/components/shared/PaperCard";
import { WashiTape } from "@/components/decorative/WashiTape";

type PenpalRecentLettersProps = {
  penpal: MockPenpal;
};

export function PenpalRecentLetters({ penpal }: PenpalRecentLettersProps) {
  return (
    <section className="space-y-3">
      <h2 className="px-1 text-base font-semibold text-ink">{"\u6700\u8fd1\u7684\u6765\u4fe1"}</h2>
      <div className="space-y-3">
        {penpal.recentLetters.slice(0, 2).map((letter, index) => (
          <PaperCard key={letter.id} className="relative p-4">
            <WashiTape
              className="absolute -top-2 right-10 h-4 w-14 opacity-45"
              tone={index === 0 ? "rose" : "blue"}
            />
            <div className="flex gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-[12px] border border-dashed border-border bg-paper-deep text-olive-deep">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-sm font-semibold text-ink">{letter.title}</h3>
                  <span className="text-[11px] text-ink-muted">{letter.date}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
                  {letter.preview}
                </p>
              </div>
            </div>
          </PaperCard>
        ))}
      </div>
    </section>
  );
}

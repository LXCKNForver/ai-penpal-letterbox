import type { MockPenpal } from "@/src/lib/mock/penpals";
import { PaperCard } from "@/components/shared/PaperCard";
import { TagPill } from "@/components/shared/TagPill";

type PenpalAboutCardProps = {
  penpal: MockPenpal;
};

export function PenpalAboutCard({ penpal }: PenpalAboutCardProps) {
  return (
    <PaperCard className="space-y-5 px-5 py-5">
      <div className="space-y-3">
        <h2 className="text-[19px] font-semibold leading-7 text-ink">{"\u5173\u4e8e TA"}</h2>
        <p className="text-[15px] leading-8 text-ink-muted">{penpal.intro}</p>
      </div>
      <div className="rounded-card border border-border/80 bg-paper-deep/38 px-4 py-3.5">
        <p className="text-[12px] font-medium leading-5 text-ink-muted">{"\u5c0f\u89d2\u843d"}</p>
        <p className="mt-2 text-[15px] leading-8 text-ink">{penpal.roomDescription}</p>
      </div>
      <div className="space-y-2.5 pt-1">
        <p className="text-[12px] font-medium leading-5 text-ink-muted">{"\u559c\u6b22\u7684\u4e1c\u897f"}</p>
        <div className="flex flex-wrap gap-2.5">
          {penpal.favoriteThings.map((item) => (
            <TagPill key={item}>{item}</TagPill>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <p className="text-[12px] font-medium leading-5 text-ink-muted">{"\u5e38\u804a\u7684\u8bdd\u9898"}</p>
        <div className="flex flex-wrap gap-2.5">
          {penpal.topics.map((item) => (
            <TagPill key={item}>{item}</TagPill>
          ))}
        </div>
      </div>
    </PaperCard>
  );
}

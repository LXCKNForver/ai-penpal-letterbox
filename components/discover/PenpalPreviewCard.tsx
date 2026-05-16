import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { TagPill } from "@/components/shared/TagPill";

type PenpalPreviewCardProps = {
  penpal: MockPenpal;
};

export function PenpalPreviewCard({ penpal }: PenpalPreviewCardProps) {
  return (
    <Link
      href={`/penpals/${penpal.id}`}
      className="relative block rounded-card border border-border bg-paper-soft/95 p-card shadow-paper transition active:translate-y-px"
    >
      <div className="flex items-start gap-3">
        <div
          className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-paper-soft text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: penpal.color }}
        >
          {penpal.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="truncate text-base font-semibold text-ink">{penpal.name}</h2>
            <span className="text-xs text-ink-muted">{penpal.age} {"\u5c81"}</span>
          </div>
          <p className="mt-0.5 text-xs text-ink-muted">{penpal.location}</p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
            {penpal.bio}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {penpal.tags.map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>
      <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-olive-deep">
        {"\u770b\u770b TA \u7684\u5c0f\u89d2\u843d"}
        <ArrowRight className="size-3.5" />
      </div>
    </Link>
  );
}

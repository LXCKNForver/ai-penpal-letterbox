import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { Stamp } from "@/components/decorative/Stamp";
import { WaxSeal } from "@/components/decorative/WaxSeal";
import { PaperCard } from "@/components/shared/PaperCard";
import { TagPill } from "@/components/shared/TagPill";

type PenpalSelectCardProps = {
  penpal: MockPenpal;
};

export function PenpalSelectCard({ penpal }: PenpalSelectCardProps) {
  return (
    <Link href={`/letters/new?penpalId=${penpal.id}`} className="block">
      <PaperCard className="overflow-hidden p-3 transition active:translate-y-px">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div
              className="grid size-14 place-items-center rounded-full border-2 border-[#fff4d7] text-sm font-semibold text-white shadow-sm"
              style={{ backgroundColor: penpal.color }}
            >
              {penpal.avatar}
            </div>
            <WaxSeal className="absolute -bottom-2 -right-2" size="sm" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-[#493c2c]">
                  {penpal.name}
                </h2>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-[#8a795f]">
                  <MapPinned className="size-3" />
                  {penpal.location} · {penpal.age}
                </p>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-[#8a795f]" />
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#66563f]">
              {penpal.bio}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {penpal.tags.slice(0, 3).map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>
          <Stamp className="hidden rotate-6 min-[390px]:grid" color={penpal.color} label="PAL" />
        </div>
      </PaperCard>
    </Link>
  );
}

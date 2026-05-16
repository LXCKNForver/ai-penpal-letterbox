import Link from "next/link";
import { PenTool } from "lucide-react";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { PenpalAboutCard } from "@/components/penpals/PenpalAboutCard";
import { PenpalHeroCard } from "@/components/penpals/PenpalHeroCard";
import { PenpalRecentLetters } from "@/components/penpals/PenpalRecentLetters";
import { PenpalRelationshipCard } from "@/components/penpals/PenpalRelationshipCard";

type PenpalDetailContentProps = {
  penpal: MockPenpal;
};

export function PenpalDetailContent({ penpal }: PenpalDetailContentProps) {
  return (
    <div className="space-y-6">
      <PenpalHeroCard penpal={penpal} />
      <PenpalAboutCard penpal={penpal} />
      <PenpalRelationshipCard penpal={penpal} />
      <PenpalRecentLetters penpal={penpal} />
      <Link
        href={`/letters/new?penpalId=${penpal.id}`}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button"
      >
        <PenTool className="size-4" />
        {"\u7ed9"} {penpal.name} {"\u5199\u4fe1"}
      </Link>
    </div>
  );
}

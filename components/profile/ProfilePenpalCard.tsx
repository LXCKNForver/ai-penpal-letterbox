import Link from "next/link";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { WashiTape } from "@/components/decorative/WashiTape";

type ProfilePenpalCardProps = {
  penpal: MockPenpal;
  index: number;
};

export function ProfilePenpalCard({ penpal, index }: ProfilePenpalCardProps) {
  const rotation = index % 3 === 1 ? "0.7deg" : index % 3 === 2 ? "-0.6deg" : "-0.4deg";

  return (
    <Link
      href={`/penpals/${penpal.id}`}
      className="relative block w-[132px] shrink-0 snap-start rounded-card border border-border bg-paper-soft p-3 shadow-paper"
      style={{ transform: `rotate(${rotation})` }}
    >
      <WashiTape className="absolute -top-2 left-7 h-4 w-12 opacity-45" tone="blue" />
      <div
        className="mx-auto grid size-14 place-items-center rounded-full border-2 border-paper-soft text-sm font-semibold text-white shadow-sm"
        style={{ backgroundColor: penpal.color }}
      >
        {penpal.avatar}
      </div>
      <h4 className="mt-3 truncate text-center text-sm font-semibold text-ink">
        {penpal.name}
      </h4>
      <p className="mt-1 truncate text-center text-[11px] text-ink-muted">
        {penpal.location}
      </p>
    </Link>
  );
}

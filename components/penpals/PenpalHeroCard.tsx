import type { MockPenpal } from "@/src/lib/mock/penpals";
import { Stamp } from "@/components/decorative/Stamp";
import { WashiTape } from "@/components/decorative/WashiTape";

type PenpalHeroCardProps = {
  penpal: MockPenpal;
};

export function PenpalHeroCard({ penpal }: PenpalHeroCardProps) {
  return (
    <section className="relative overflow-hidden rounded-paper border border-border bg-paper-soft/90 p-5 shadow-paper">
      <div className="absolute -right-12 -top-12 size-32 rounded-full bg-moon/20 blur-2xl" />
      <WashiTape className="absolute left-10 top-2 h-5 w-16 opacity-55" tone="sand" />
      <Stamp
        className="absolute right-5 top-5 rotate-[8deg] opacity-70"
        color={penpal.color}
        label="PAL"
      />
      <div className="relative z-10 flex items-start gap-4 pt-3">
        <div
          className="grid size-20 shrink-0 place-items-center rounded-full border-4 border-paper-soft text-xl font-semibold text-white shadow-paper"
          style={{ backgroundColor: penpal.color }}
        >
          {penpal.avatarLabel}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-5 text-ink-muted">
            {penpal.country} · {penpal.city}
          </p>
          <h1 className="mt-1.5 text-[28px] font-semibold leading-8 text-ink">
            {penpal.name}
          </h1>
          <p className="mt-2 text-[15px] leading-5 text-ink-muted">
            {penpal.age} {"\u5c81"}
          </p>
        </div>
      </div>
      <blockquote className="relative z-10 mt-6 rounded-card border border-border bg-paper-deep/40 px-4 py-3.5 text-[15px] leading-8 text-ink">
        “{penpal.quote}”
      </blockquote>
    </section>
  );
}

import Link from "next/link";
import { ArrowLeft, Inbox, Moon, Waves } from "lucide-react";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { mockReplyEstimate } from "@/src/lib/mock/waiting";
import { Stamp } from "@/components/decorative/Stamp";
import { WaxSeal } from "@/components/decorative/WaxSeal";

type WaitingReplyStateProps = {
  penpal: MockPenpal;
};

export function WaitingReplyState({ penpal }: WaitingReplyStateProps) {
  return (
    <div className="min-h-[calc(100dvh-148px)] px-page pb-6 pt-4">
      <Link
        href="/inbox"
        className="grid size-10 place-items-center rounded-button border border-border bg-paper-soft/80 text-ink"
        aria-label={"\u8fd4\u56de\u4fe1\u7bb1"}
      >
        <ArrowLeft className="size-4" />
      </Link>

      <section className="mt-9 overflow-hidden rounded-paper border border-border/60 bg-olive-soft p-card text-center shadow-floating">
        <div className="relative mx-auto flex min-h-[250px] max-w-[310px] items-center justify-center rounded-paper bg-[linear-gradient(180deg,var(--lake-blue)_0%,#8794a1_52%,#d8d7be_100%)]">
          <Moon
            className="absolute right-10 top-9 size-9 text-moon"
            fill="currentColor"
            strokeWidth={1.5}
          />
          <div className="absolute bottom-9 left-6 right-6 h-20 rounded-[50%] bg-lake-blue/35 blur-[1px]" />
          <Waves className="absolute bottom-12 left-8 size-9 text-paper/70" strokeWidth={1.5} />
          <Waves
            className="absolute bottom-8 right-9 size-11 text-paper-soft/70"
            strokeWidth={1.5}
          />

          <div className="relative grid h-28 w-16 place-items-center rounded-[32px] border border-paper-deep/70 bg-paper/75 shadow-floating animate-float-slow">
            <div className="absolute -top-4 h-8 w-9 rounded-t-[18px] border border-border bg-paper-deep" />
            <div className="h-12 w-10 rounded-md border border-border bg-paper-soft shadow-sm">
              <div className="mx-auto mt-3 h-px w-6 bg-border" />
              <div className="mx-auto mt-2 h-px w-5 bg-border" />
            </div>
            <WaxSeal className="absolute bottom-8 right-2" size="sm" />
          </div>

          <Stamp
            className="absolute left-5 top-6 rotate-[-7deg] scale-75 opacity-70"
            color={penpal.color}
            label="SENT"
          />
        </div>

        <div className="mx-auto mt-8 max-w-[300px]">
          <h1 className="text-2xl font-semibold text-ink">
            {"\u4f60\u7684\u4fe1\u5df2\u7ecf\u5bc4\u51fa"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-ink-muted">{mockReplyEstimate.note}</p>
        </div>

        <div className="mx-auto mt-7 rounded-card border border-border/70 bg-paper-soft/80 px-4 py-3 text-sm text-ink-muted">
          {penpal.name === "Luna"
            ? "Luna \u53ef\u80fd\u4f1a\u5728\u660e\u5929\u508d\u665a\u56de\u4fe1"
            : mockReplyEstimate.text}
        </div>

        <div className="mt-8 space-y-3">
          <Link
            href="/inbox"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button"
          >
            <Inbox className="size-4" />
            {"\u56de\u5230\u4fe1\u7bb1"}
          </Link>
          <Link
            href="/profile"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-button border border-border bg-paper-soft/70 px-5 text-sm font-medium text-ink-muted"
          >
            {"\u4eca\u5929\u5148\u5199\u5230\u8fd9\u91cc"}
          </Link>
        </div>
      </section>
    </div>
  );
}

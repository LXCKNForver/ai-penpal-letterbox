import { Archive, Mail, Send, UserRound } from "lucide-react";
import { PaperCard } from "@/components/shared/PaperCard";
import { WashiTape } from "@/components/decorative/WashiTape";
import { WaxSeal } from "@/components/decorative/WaxSeal";
import { ProfilePenpalCard } from "@/components/profile/ProfilePenpalCard";
import { inboxLetters, sentLetters } from "@/src/lib/mock/letters";
import { mockPenpals } from "@/src/lib/mock/penpals";

const todayNote = "\u4eca\u5929\u9002\u5408\u6162\u6162\u56de\u4fe1\u3002";

export function ProfilePlaceholder() {
  const latestLetter = inboxLetters[0];
  const stats = [
    { label: "\u6536\u5230\u6765\u4fe1", value: inboxLetters.length, icon: Mail },
    { label: "\u5bc4\u51fa\u4fe1\u4ef6", value: sentLetters.length, icon: Send },
    { label: "\u8ba4\u8bc6\u7b14\u53cb", value: mockPenpals.length, icon: UserRound },
  ];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-paper border border-border bg-paper-soft/88 p-5 shadow-paper">
        <div className="absolute -right-12 -top-12 size-32 rounded-full bg-moon/20 blur-2xl" />
        <WashiTape className="absolute right-8 top-3 h-5 w-16 opacity-55" tone="sand" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="relative grid size-18 place-items-center rounded-full border-4 border-paper-soft bg-olive text-paper-soft shadow-paper">
            <UserRound className="size-8" />
            <WaxSeal className="absolute -bottom-2 -right-2" size="sm" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-muted">{"\u4f60\u597d\u5440\uff0c\u5c0f\u7b14\u53cb"}</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">{"\u6211\u7684\u4fe1\u7bb1\u62bd\u5c49"}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{todayNote}</p>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-paper-deep/70 px-3 py-1.5 text-xs text-ink-muted"
              >
                <Icon className="size-3.5 text-olive-deep" />
                {item.label} · {item.value}
              </span>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-semibold text-ink">{"\u6211\u7684\u7b14\u53cb"}</h3>
          <span className="text-xs text-ink-muted">{"\u6536\u85cf\u7684\u8fdc\u65b9"}</span>
        </div>
        <div className="-mx-page flex snap-x gap-3 overflow-x-auto px-page pb-2 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mockPenpals.map((penpal, index) => (
            <ProfilePenpalCard key={penpal.id} penpal={penpal} index={index} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-semibold text-ink">{"\u6700\u8fd1\u6536\u5230\u7684\u4fe1"}</h3>
          <Archive className="size-4 text-ink-muted" />
        </div>
        <PaperCard className="relative overflow-hidden p-4">
          <WashiTape className="absolute -top-2 right-10 h-4 w-14 opacity-45" tone="rose" />
          <div className="flex gap-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-[12px] border border-dashed border-border bg-paper-deep text-olive-deep">
              <Mail className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink-muted">From. {latestLetter.from}</p>
              <h4 className="mt-1 text-base font-semibold text-ink">
                {"\u6765\u81ea Luna \u7684\u56de\u4fe1"}
              </h4>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
                {"\u4eb2\u7231\u7684\u670b\u53cb\uff1a\u4eca\u5929\u5b66\u6821\u7684\u5929\u6c14\u5f88\u597d\uff0c\u6211\u5728\u7a97\u8fb9\u7ed9\u4f60\u5199\u4fe1..."}
              </p>
            </div>
          </div>
        </PaperCard>
      </section>

      <PaperCard className="bg-paper-deep/45 p-4">
        <p className="text-sm leading-6 text-ink-muted">
          {"\u628a\u559c\u6b22\u7684\u4fe1\u6162\u6162\u6536\u597d\uff0c\u7b49\u4e0b\u4e00\u4e2a\u5b89\u9759\u7684\u508d\u665a\u518d\u6253\u5f00\u3002"}
        </p>
      </PaperCard>
    </div>
  );
}

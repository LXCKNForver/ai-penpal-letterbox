import { CalendarDays, Mail, Send } from "lucide-react";
import type { MockPenpal } from "@/src/lib/mock/penpals";

type PenpalRelationshipCardProps = {
  penpal: MockPenpal;
};

export function PenpalRelationshipCard({ penpal }: PenpalRelationshipCardProps) {
  const items = [
    {
      label: "\u8ba4\u8bc6\u4e86",
      value: `${penpal.relationshipStats.knownDays} \u5929`,
      icon: CalendarDays,
    },
    {
      label: "\u6536\u5230",
      value: `${penpal.relationshipStats.lettersReceived} \u5c01`,
      icon: Mail,
    },
    {
      label: "\u5bc4\u51fa",
      value: `${penpal.relationshipStats.lettersSent} \u5c01`,
      icon: Send,
    },
  ];

  return (
    <section className="rounded-paper border border-border bg-paper-soft/86 px-5 py-5 shadow-paper">
      <h2 className="text-[19px] font-semibold leading-7 text-ink">{"\u4f60\u4eec\u4e4b\u95f4"}</h2>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-card border border-border bg-paper-deep/48 px-2 py-3.5 text-center"
            >
              <Icon className="mx-auto size-4 text-olive-deep" />
              <p className="mt-2 text-[11px] leading-4 text-ink-muted">{item.label}</p>
              <p className="mt-1 text-[15px] font-semibold leading-5 text-ink">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

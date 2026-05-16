import { Clock3, MailCheck } from "lucide-react";
import type { SentLetter } from "@/src/lib/mock/letters";
import { PaperCard } from "@/components/shared/PaperCard";
import { WaxSeal } from "@/components/decorative/WaxSeal";

type ReplyCardProps = {
  reply: SentLetter;
};

export function ReplyCard({ reply }: ReplyCardProps) {
  const waiting = reply.status === "waiting";

  return (
    <PaperCard className="p-3">
      <div className="flex items-center gap-3">
        <div className="relative grid size-12 place-items-center rounded-card border border-border bg-paper-deep">
          <MailCheck className="size-5 text-olive-deep" />
          {waiting ? <WaxSeal className="absolute -bottom-2 -right-2" size="sm" /> : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-ink-muted">To. {reply.to}</p>
          <h2 className="mt-1 truncate text-sm font-semibold text-ink">{reply.title}</h2>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-muted">
            <Clock3 className="size-3" />
            {reply.date}
          </p>
        </div>
        <span className="rounded-pill border border-border bg-paper-deep px-2.5 py-1 text-[11px] text-ink-muted">
          {waiting ? "\u7b49\u5f85\u4e2d" : "\u5df2\u5bc4\u51fa"}
        </span>
      </div>
    </PaperCard>
  );
}

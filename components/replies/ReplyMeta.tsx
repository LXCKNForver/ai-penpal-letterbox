import { CalendarDays, MapPinned } from "lucide-react";
import type { MockReply } from "@/src/lib/mock/replies";
import { PaperCard } from "@/components/shared/PaperCard";

type ReplyMetaProps = {
  reply: MockReply;
};

export function ReplyMeta({ reply }: ReplyMetaProps) {
  return (
    <PaperCard className="p-3">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-full bg-[#87985f] text-sm font-semibold text-[#fff9e9]">
          {reply.from.slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-[#493c2c]">来自 {reply.from} 的回信</h2>
          <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-[#8a795f]">
            <span className="inline-flex items-center gap-1">
              <MapPinned className="size-3" />
              {reply.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3" />
              {reply.date}
            </span>
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

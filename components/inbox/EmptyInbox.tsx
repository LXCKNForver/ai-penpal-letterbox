import { MailOpen } from "lucide-react";
import { PaperCard } from "@/components/shared/PaperCard";

export function EmptyInbox() {
  return (
    <PaperCard className="py-10 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#e7ddc3] text-[#7d8a54]">
        <MailOpen className="size-6" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-[#493c2c]">今天信箱很安静</h2>
      <p className="mx-auto mt-2 max-w-56 text-sm leading-6 text-[#7c6b51]">
        去探索页遇见新的笔友，或者写下一封慢慢抵达的信。
      </p>
    </PaperCard>
  );
}

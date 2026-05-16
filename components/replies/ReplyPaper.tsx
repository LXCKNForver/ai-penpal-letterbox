import type { MockReply } from "@/src/lib/mock/replies";
import { Stamp } from "@/components/decorative/Stamp";
import { WashiTape } from "@/components/decorative/WashiTape";
import { WaxSeal } from "@/components/decorative/WaxSeal";

type ReplyPaperProps = {
  reply: MockReply;
};

export function ReplyPaper({ reply }: ReplyPaperProps) {
  return (
    <article className="relative rounded-[18px] border border-[#dec9a8] bg-[#fffaf0] p-5 shadow-[0_14px_30px_rgba(86,62,33,0.12)]">
      <WashiTape className="absolute -top-3 right-10 rotate-3" tone="rose" />
      <Stamp className="absolute right-4 top-5 rotate-6" color="#c58f7a" label="MAIL" />
      <div className="space-y-4 pr-14 text-sm leading-8 text-[#4e412f]">
        <p className="font-semibold">{reply.greeting}</p>
        {reply.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="pt-2 text-right">祝好，<br />{reply.signature}</p>
      </div>
      <WaxSeal className="absolute bottom-5 right-7" />
    </article>
  );
}

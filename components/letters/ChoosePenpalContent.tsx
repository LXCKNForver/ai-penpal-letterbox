import Link from "next/link";
import { PenLine } from "lucide-react";
import { PenpalSelectCard } from "@/components/letters/PenpalSelectCard";
import { PaperCard } from "@/components/shared/PaperCard";
import type { Penpal } from "@/src/lib/db/penpals";

type ChoosePenpalContentProps = {
  penpals: Penpal[];
};

export function ChoosePenpalContent({ penpals }: ChoosePenpalContentProps) {
  return (
    <div className="space-y-4">
      <PaperCard>
        <p className="text-xs text-[#8a795f]">
          {"\u5199\u4fe1\u524d\u5148\u9009\u4e00\u4f4d\u6536\u4fe1\u4eba"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#493c2c]">
          {"\u4eca\u5929\u60f3\u628a\u4fe1\u5bc4\u7ed9\u8c01\uff1f"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#756247]">
          {"\u9009\u4e00\u4f4d\u7b14\u53cb\uff0c\u6211\u4eec\u4f1a\u628a\u4ed6\u7684\u540d\u5b57\u653e\u5230\u4fe1\u7eb8\u4e0a\u3002"}
        </p>
      </PaperCard>
      {penpals.length > 0 ? (
        <div className="space-y-3">
          {penpals.map((penpal) => (
            <PenpalSelectCard key={penpal.id} penpal={penpal} />
          ))}
        </div>
      ) : (
        <PaperCard className="p-5 text-center">
          <h2 className="text-lg font-semibold text-ink">
            还没有可以写信的地址。
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-muted">
            先写一封漂流信，把你的问候寄给还不知道名字的远方。
          </p>
          <Link
            href="/letters/first"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button"
          >
            <PenLine className="size-4" />
            写下第一封漂流信
          </Link>
        </PaperCard>
      )}
    </div>
  );
}

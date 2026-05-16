import { PenpalSelectCard } from "@/components/letters/PenpalSelectCard";
import { PaperCard } from "@/components/shared/PaperCard";
import { mockPenpals } from "@/src/lib/mock/penpals";

export function ChoosePenpalContent() {
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
      <div className="space-y-3">
        {mockPenpals.map((penpal) => (
          <PenpalSelectCard key={penpal.id} penpal={penpal} />
        ))}
      </div>
    </div>
  );
}

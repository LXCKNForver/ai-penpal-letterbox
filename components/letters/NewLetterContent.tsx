"use client";

import { useState } from "react";
import { LetterEditor } from "@/components/letters/LetterEditor";
import { LetterPaper } from "@/components/letters/LetterPaper";
import { SendLetterButton } from "@/components/letters/SendLetterButton";
import { PaperCard } from "@/components/shared/PaperCard";
import { mockPenpals } from "@/src/lib/mock/penpals";

type NewLetterContentProps = {
  penpalId?: string;
};

export function NewLetterContent({ penpalId = "luna" }: NewLetterContentProps) {
  const [content, setContent] = useState("");
  const recipient =
    mockPenpals.find((penpal) => penpal.id === penpalId) ??
    mockPenpals.find((penpal) => penpal.id === "luna") ??
    mockPenpals[0];

  return (
    <div className="space-y-section">
      <PaperCard className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="grid size-13 place-items-center rounded-full border-2 border-paper-soft text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: recipient.color }}
          >
            {recipient.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
              {"\u6536\u4fe1\u4eba"}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-ink">{recipient.name}</h2>
            <p className="mt-0.5 text-xs text-ink-muted">{recipient.location}</p>
          </div>
          <span className="rounded-pill border border-border bg-paper-deep px-3 py-1 text-[11px] text-ink-muted">
            {"\u5f85\u5bc4\u51fa"}
          </span>
        </div>
      </PaperCard>
      <LetterPaper to={recipient.name}>
        <LetterEditor value={content} onChange={setContent} />
      </LetterPaper>
      <div className="pt-1">
        <SendLetterButton disabled={content.trim().length < 8} penpalId={recipient.id} />
      </div>
    </div>
  );
}

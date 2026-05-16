"use client";

import { useState } from "react";
import { EmptyInbox } from "@/components/inbox/EmptyInbox";
import { InboxTabs } from "@/components/inbox/InboxTabs";
import { LetterCard } from "@/components/inbox/LetterCard";
import { ReplyCard } from "@/components/inbox/ReplyCard";
import { inboxLetters, sentLetters } from "@/src/lib/mock/letters";

export function InboxContent() {
  const [tab, setTab] = useState<"inbox" | "sent">("inbox");
  const hasLetters = inboxLetters.length > 0;
  const unreadCount = inboxLetters.filter((letter) => letter.unread).length;
  const unreadText =
    unreadCount === 1
      ? "\u6709 1 \u5c01\u65b0\u6765\u4fe1"
      : `\u6709 ${unreadCount} \u5c01\u65b0\u6765\u4fe1`;

  return (
    <div className="space-y-5 pt-[190px]">
      {unreadCount > 0 ? (
        <div className="relative mx-1 rounded-[22px] border border-border/70 bg-paper-soft/82 px-4 py-3 shadow-[0_9px_20px_rgba(89,64,33,0.10)] backdrop-blur-[1px]">
          <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-border/60 bg-paper-soft/82" />
          <p className="text-[11px] text-ink-muted">{"\u4eca\u65e5\u4fe1\u7bb1"}</p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <h2 className="text-[22px] font-semibold leading-tight text-ink">{unreadText}</h2>
            <span className="pb-0.5 text-xs text-ink-muted/80">{"\u6162\u6162\u8bfb"}</span>
          </div>
        </div>
      ) : null}
      <InboxTabs value={tab} onChange={setTab} />
      {tab === "inbox" ? (
        <div className="space-y-4">
          {hasLetters ? (
            inboxLetters.map((letter, index) => (
              <LetterCard key={letter.id} letter={letter} index={index} />
            ))
          ) : (
            <EmptyInbox />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sentLetters.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

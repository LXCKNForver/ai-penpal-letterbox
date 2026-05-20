"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyInbox } from "@/components/inbox/EmptyInbox";
import { InboxTabs } from "@/components/inbox/InboxTabs";
import { LetterLifecycleCard } from "@/components/inbox/LetterLifecycleCard";
import type { LetterWithPenpal } from "@/types/letter";

type InboxContentProps = {
  hasPenpals: boolean;
  initialTab?: "inbox" | "sent";
  letters: LetterWithPenpal[];
  newReplyId?: string;
};

function getReplyTime(letter: LetterWithPenpal) {
  const time = new Date(letter.reply?.createdAt ?? letter.createdAt ?? 0).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function getInboxNotice({
  repliedCount,
  unreadCount,
}: {
  repliedCount: number;
  unreadCount: number;
}) {
  if (unreadCount > 0) {
    return {
      title: unreadCount === 1 ? "有 1 封新回信" : `有 ${unreadCount} 封新回信`,
      subtitle: "慢慢读",
    };
  }

  if (repliedCount > 0) {
    return {
      title: "今天的信都读完了",
      subtitle: "信箱安静下来了",
    };
  }

  return {
    title: "还没有收到回信",
    subtitle: "再等等风",
  };
}

export function InboxContent({
  hasPenpals,
  initialTab = "inbox",
  letters,
  newReplyId,
}: InboxContentProps) {
  const [tab, setTab] = useState<"inbox" | "sent">(initialTab);
  const repliedLetters = useMemo(
    () =>
      letters
        .filter((letter) => letter.status === "replied" && Boolean(letter.reply))
        .toSorted((left, right) => getReplyTime(right) - getReplyTime(left)),
    [letters]
  );
  const pendingLetters = useMemo(
    () => letters.filter((letter) => letter.status === "pending"),
    [letters]
  );
  const hasAnyLetters = letters.length > 0;
  const repliedCount = repliedLetters.length;
  const unreadCount = repliedLetters.filter((letter) => !letter.reply?.isRead).length;
  const notice = getInboxNotice({ repliedCount, unreadCount });

  useEffect(() => {
    if (newReplyId) {
      toast("窗边多了一封新的来信");
    }
  }, [newReplyId]);

  if (!hasPenpals && !hasAnyLetters) {
    return (
      <div className="space-y-5 pt-[190px]">
        <EmptyInbox tone="first-letter" />
      </div>
    );
  }

  return (
    <div className="space-y-5 pt-[190px]">
      <div className="relative mx-1 rounded-[22px] border border-border/70 bg-paper-soft/82 px-4 py-3 shadow-[0_9px_20px_rgba(89,64,33,0.10)] backdrop-blur-[1px]">
        <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-border/60 bg-paper-soft/82" />
        <p className="text-[11px] text-ink-muted">{"今日信箱"}</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h2 className="text-[22px] font-semibold leading-tight text-ink">{notice.title}</h2>
          <span className="pb-0.5 text-xs text-ink-muted/80">{notice.subtitle}</span>
        </div>
      </div>
      <InboxTabs value={tab} onChange={setTab} />
      {tab === "inbox" ? (
        <div className="space-y-4">
          {pendingLetters.length > 0 ? (
            pendingLetters.map((letter, index) => (
              <LetterLifecycleCard key={letter.id} letter={letter} index={index} />
            ))
          ) : (
            <EmptyInbox tone="inbox" />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {repliedLetters.length > 0 ? (
            repliedLetters.map((letter, index) => (
              <LetterLifecycleCard
                key={letter.id}
                highlight={letter.reply?.id === newReplyId}
                letter={letter}
                index={index}
              />
            ))
          ) : (
            <EmptyInbox tone="sent" />
          )}
        </div>
      )}
    </div>
  );
}

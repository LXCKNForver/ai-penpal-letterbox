"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { EmptyInbox } from "@/components/inbox/EmptyInbox";
import { InboxTabs } from "@/components/inbox/InboxTabs";
import { LetterLifecycleCard } from "@/components/inbox/LetterLifecycleCard";
import { useI18n } from "@/src/i18n/useI18n";
import type { LetterWithPenpal } from "@/types/letter";

type InboxContentProps = {
  hasPenpals: boolean;
  initialTab?: "inbox" | "sent";
  letters: LetterWithPenpal[];
  newReplyId?: string;
};

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.24,
      ease: "easeOut",
    },
    y: 8,
  },
};

function getReplyTime(letter: LetterWithPenpal) {
  const time = new Date(letter.reply?.createdAt ?? letter.createdAt ?? 0).getTime();

  return Number.isNaN(time) ? 0 : time;
}

export function InboxContent({
  hasPenpals,
  initialTab = "inbox",
  letters,
  newReplyId,
}: InboxContentProps) {
  const { t } = useI18n();
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
  const notice =
    unreadCount > 0
      ? {
          title:
            unreadCount === 1
              ? t("inbox.notice.unreadOne")
              : t("inbox.notice.unreadMany", { count: unreadCount }),
          subtitle: t("inbox.tabs.received"),
        }
      : repliedCount > 0
        ? {
            title: t("inbox.notice.readAll"),
            subtitle: t("inbox.notice.quiet"),
          }
        : {
            title: t("inbox.notice.noReply"),
            subtitle: t("inbox.notice.waitWind"),
          };

  useEffect(() => {
    if (newReplyId) {
      toast(t("inbox.notice.newReplyToast"));
    }
  }, [newReplyId, t]);

  if (!hasPenpals && !hasAnyLetters) {
    return (
      <motion.div
        animate="visible"
        className="space-y-5 pt-[190px]"
        initial="hidden"
        variants={sectionVariants}
      >
        <EmptyInbox tone="first-letter" />
      </motion.div>
    );
  }

  return (
    <div className="space-y-5 pt-[190px]">
      <div className="relative mx-1 rounded-[22px] border border-border/70 bg-paper-soft/82 px-4 py-3 shadow-[0_9px_20px_rgba(89,64,33,0.10)] backdrop-blur-[1px]">
        <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-border/60 bg-paper-soft/82" />
        <p className="text-[11px] text-ink-muted">{t("inbox.today")}</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h2 className="text-[22px] font-semibold leading-tight text-ink">{notice.title}</h2>
          <span className="pb-0.5 text-xs text-ink-muted/80">{notice.subtitle}</span>
        </div>
      </div>
      <InboxTabs value={tab} onChange={setTab} />
      <AnimatePresence mode="wait">
        <motion.div
          animate="visible"
          className="space-y-4"
          exit="exit"
          initial="hidden"
          key={tab}
          variants={sectionVariants}
        >
          {tab === "inbox" ? (
            pendingLetters.length > 0 ? (
              pendingLetters.map((letter, index) => (
                <LetterLifecycleCard key={letter.id} letter={letter} index={index} />
              ))
            ) : (
              <EmptyInbox tone="inbox" />
            )
          ) : repliedLetters.length > 0 ? (
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

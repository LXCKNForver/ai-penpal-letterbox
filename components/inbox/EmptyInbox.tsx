"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MailOpen, PenLine } from "lucide-react";
import { PaperCard } from "@/components/shared/PaperCard";
import { useI18n } from "@/src/i18n/useI18n";

type EmptyInboxProps = {
  tone?: "first-letter" | "inbox" | "sent";
};

const copy = {
  "first-letter": {
    titleKey: "inbox.empty.firstTitle" as const,
    bodyKey: "inbox.empty.firstBody" as const,
    showAction: true,
  },
  inbox: {
    titleKey: "inbox.empty.waitingTitle" as const,
    bodyKey: "inbox.empty.waitingBody" as const,
    showAction: false,
  },
  sent: {
    titleKey: "inbox.empty.receivedTitle" as const,
    bodyKey: "inbox.empty.receivedBody" as const,
    showAction: false,
  },
};

export function EmptyInbox({ tone = "inbox" }: EmptyInboxProps) {
  const { t } = useI18n();
  const content = copy[tone];

  return (
    <PaperCard className="py-10 text-center">
      <motion.div
        animate={{
          opacity: [0.38, 0.62, 0.38],
          scale: [0.96, 1.04, 0.96],
        }}
        aria-hidden="true"
        className="absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full bg-moon/35 blur-xl"
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        className="mx-auto grid size-14 place-items-center rounded-full bg-paper-deep text-olive-deep shadow-[0_10px_24px_rgba(89,64,33,0.08)]"
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <MailOpen className="size-6" />
      </motion.div>
      <h2 className="mt-4 text-base font-semibold text-ink">{t(content.titleKey)}</h2>
      <p className="mx-auto mt-2 max-w-64 text-sm leading-6 text-ink-muted">
        {t(content.bodyKey)}
      </p>
      {content.showAction ? (
        <Link
          href="/letters/first"
          className="mx-auto mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button transition active:scale-[0.985]"
        >
          <PenLine className="size-4" />
          {t("inbox.empty.action")}
        </Link>
      ) : null}
    </PaperCard>
  );
}

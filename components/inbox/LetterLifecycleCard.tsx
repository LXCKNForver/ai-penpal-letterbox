"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Clock3, Mail, Waves } from "lucide-react";
import { WashiTape } from "@/components/decorative/WashiTape";
import { PaperCard } from "@/components/shared/PaperCard";
import { cn } from "@/lib/utils";
import {
  getLetterWaitingStage,
  type LetterWaitingStage,
} from "@/src/lib/utils/letterStatus";
import type { LetterWithPenpal } from "@/types/letter";

type LetterLifecycleCardProps = {
  highlight?: boolean;
  letter: LetterWithPenpal;
  index?: number;
};

function formatDateTime(value: string | null) {
  if (!value) {
    return "时间还在路上";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function indexRotation(index = 0) {
  if (index % 3 === 1) {
    return "rotate-[0.45deg]";
  }

  if (index % 3 === 2) {
    return "rotate-[-0.35deg]";
  }

  return "rotate-[-0.55deg]";
}

function isPastExpectedReply(value: string | null) {
  if (!value) {
    return false;
  }

  const time = new Date(value).getTime();

  return !Number.isNaN(time) && Date.now() >= time;
}

function getPendingLabel(stage: LetterWaitingStage, scheduledReplyAt: string | null) {
  switch (stage) {
    case "drifting":
      return "正在漂流中";
    case "arrived":
      return "已抵达远方";
    case "writing":
      return isPastExpectedReply(scheduledReplyAt)
        ? "远方正在慢慢写回信"
        : "正在等待回信";
    case "failed":
      return "寄送失败";
    case "replied":
      return "回信已抵达";
  }
}

function getPendingStamp(stage: LetterWaitingStage) {
  switch (stage) {
    case "arrived":
      return "ARRIVE";
    case "writing":
      return "WRITE";
    case "failed":
      return "FAILED";
    default:
      return "DRIFT";
  }
}

function getDiscoveredPendingTitle(
  stage: LetterWaitingStage,
  scheduledReplyAt: string | null,
  penpalName: string
) {
  return `写给 ${penpalName} 的信${getPendingLabel(stage, scheduledReplyAt)}`;
}

export function LetterLifecycleCard({
  highlight,
  letter,
  index,
}: LetterLifecycleCardProps) {
  const reply = letter.reply ?? null;
  const stage = getLetterWaitingStage(letter, reply);
  const hasReceivedReply = letter.status === "replied" && Boolean(reply);
  const isPending = !hasReceivedReply;
  const isUnknownPenpal = isPending && !letter.penpalDiscovered;
  const preview = hasReceivedReply && reply ? reply.content : letter.content;
  const href = isPending
    ? `/letters/waiting?letterId=${letter.id}`
    : reply
      ? `/letters/reply/${reply.id}`
      : `/letters/waiting?letterId=${letter.id}`;
  const isUnread = Boolean(!isPending && reply && !reply.isRead);
  const driftDuration = 4.8 + ((index ?? 0) % 3) * 0.45;

  return (
    <Link href={href} className="block">
      <motion.div
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.992 }}
      >
        <PaperCard
          className={cn(
            "overflow-visible border-border/55 bg-paper-soft/88 p-3.5 shadow-[0_8px_18px_rgba(89,64,33,0.075)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#e6d4ae] hover:shadow-[0_13px_26px_rgba(89,64,33,0.12)] active:translate-y-px",
            isPending && "bg-olive-soft/70",
            isUnread &&
              "border-stamp-red/25 bg-paper-soft shadow-[0_10px_22px_rgba(180,92,79,0.11)]",
            highlight && "animate-fade-up ring-2 ring-olive/35",
            indexRotation(index)
          )}
        >
          <WashiTape
            className="absolute -top-2 left-8 h-4 w-14 opacity-45"
            tone={isPending ? "blue" : "sand"}
          />
          <span className="absolute right-3 top-2 rounded-pill border border-border/50 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.12em] text-ink-muted/45">
            {isPending ? getPendingStamp(stage) : isUnread ? "UNREAD" : "MAIL"}
          </span>
          <div className="flex items-center gap-3.5">
            <motion.div
              animate={{ rotate: [0, -1, 1, 0], y: [0, -2, 0] }}
              className="relative grid size-14 shrink-0 place-items-center rounded-[14px] border border-dashed border-ink-muted/30 bg-paper-soft shadow-[0_7px_14px_rgba(89,64,33,0.10)]"
              style={{ color: letter.penpal.color }}
              transition={{
                rotate: {
                  duration: driftDuration,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
                y: {
                  duration: driftDuration,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
                scale: { duration: 0.14, ease: "easeOut" },
                boxShadow: { duration: 0.28, ease: "easeOut" },
              }}
              whileHover={{
                boxShadow: "0 11px 22px rgba(128, 91, 42, 0.16)",
                scale: 1.03,
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {isPending ? (
                <Waves className="size-6" strokeWidth={1.4} />
              ) : (
                <Mail className="size-6" strokeWidth={1.35} />
              )}
              <span
                className="absolute -bottom-1.5 rounded-pill border border-paper-soft px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-paper-soft shadow-sm"
                style={{ backgroundColor: letter.penpal.color }}
              >
                {isPending ? "WAIT" : isUnread ? "NEW" : "READ"}
              </span>
            </motion.div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-sm font-semibold text-ink">
                  {isPending
                    ? isUnknownPenpal
                      ? "写给未知远方的信正在漂流中"
                      : getDiscoveredPendingTitle(
                          stage,
                          letter.scheduledReplyAt,
                          letter.penpal.name
                        )
                    : `来自 ${letter.penpal.name} 的回信`}
                </h2>
                {isUnread ? (
                  <span className="size-2 rounded-full bg-stamp-red" aria-label="未读" />
                ) : null}
              </div>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-muted">
                <Clock3 className="size-3" />
                {isPending
                  ? `预计回信：${formatDateTime(letter.scheduledReplyAt)}`
                  : reply
                    ? `收信时间：${formatDateTime(reply.createdAt)}`
                    : `已收到 ${letter.penpal.name} 的回信`}
              </p>
              <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-ink-muted">
                {preview}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2 text-[11px] text-ink-muted/75">
              {formatDateTime(hasReceivedReply && reply ? reply.createdAt : letter.createdAt)}
              <ChevronRight className="size-4" />
            </div>
          </div>
        </PaperCard>
      </motion.div>
    </Link>
  );
}

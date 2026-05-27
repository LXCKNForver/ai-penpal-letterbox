"use client";

import { motion } from "framer-motion";
import { Mail, MailOpen, Send } from "lucide-react";
import type { PenpalRelationshipSummary } from "@/src/lib/relationship";
import { PaperCard } from "@/components/shared/PaperCard";
import { WashiTape } from "@/components/decorative/WashiTape";
import { useI18n } from "@/src/i18n/useI18n";

type PenpalRecentLettersProps = {
  relationship: PenpalRelationshipSummary;
};

export function PenpalRecentLetters({ relationship }: PenpalRecentLettersProps) {
  const { t } = useI18n();
  const hasLetters = relationship.recentLetters.length > 0;

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between px-1">
        <div>
          <h2 className="text-base font-semibold text-ink">{t("penpal.recentEchoes")}</h2>
          <p className="mt-1 text-xs text-ink-muted">
            {hasLetters ? "信箱里留下的一点痕迹" : "等待故事开始"}
          </p>
        </div>
        <span className="rounded-pill border border-border/70 bg-paper-soft/72 px-3 py-1 text-[11px] text-ink-muted">
          {relationship.totalLetters > 0 ? `${relationship.totalLetters} 次往来` : "安静"}
        </span>
      </div>
      <div className="space-y-3">
        {hasLetters ? (
          relationship.recentLetters.map((letter, index) => {
            const isReceived = letter.tone === "received";
            const Icon = isReceived ? MailOpen : Send;

            return (
              <motion.div
                animate={{ y: [0, -1, 0] }}
                key={letter.id}
                transition={{
                  delay: index * 0.35,
                  duration: 5.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <PaperCard className="relative p-4 shadow-[0_10px_24px_rgba(86,62,33,0.08)]">
                  <WashiTape
                    className="absolute -top-2 right-10 h-4 w-14 opacity-45"
                    tone={isReceived ? "rose" : "blue"}
                  />
                  <div className="flex gap-3">
                    <div className="grid size-11 shrink-0 place-items-center rounded-[12px] border border-dashed border-border bg-paper-deep text-olive-deep">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-semibold text-ink">
                          {letter.title}
                        </h3>
                        <span className="text-[11px] text-ink-muted">{letter.date}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-ink-muted/70">
                        {isReceived ? "TA 寄来的回信" : "你寄出的漂流信"}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
                        {letter.content}
                      </p>
                    </div>
                  </div>
                </PaperCard>
              </motion.div>
            );
          })
        ) : (
          <PaperCard className="relative overflow-hidden px-5 py-7 text-center">
            <motion.div
              animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.96, 1.04, 0.96] }}
              className="absolute left-1/2 top-5 h-20 w-20 -translate-x-1/2 rounded-full bg-moon/35 blur-2xl"
              transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
            />
            <div className="relative mx-auto grid size-[3.25rem] place-items-center rounded-full border border-border/70 bg-paper-deep/62 text-olive-deep">
              <Mail className="size-6" />
            </div>
            <h3 className="relative mt-4 text-sm font-semibold text-ink">
              你们还没有开始第一次漂流
            </h3>
            <p className="relative mx-auto mt-2 max-w-60 text-sm leading-6 text-ink-muted">
              也许第一封信正在路上，也许故事还在等一个安静的开头。
            </p>
          </PaperCard>
        )}
      </div>
    </section>
  );
}

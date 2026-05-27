"use client";

import { motion } from "framer-motion";
import { CalendarDays, Mail, Send, Waves } from "lucide-react";
import type { PenpalRelationshipSummary } from "@/src/lib/relationship";
import { useI18n } from "@/src/i18n/useI18n";

type PenpalRelationshipCardProps = {
  relationship: PenpalRelationshipSummary;
};

export function PenpalRelationshipCard({ relationship }: PenpalRelationshipCardProps) {
  const { t } = useI18n();
  const items = [
    {
      detail:
        relationship.knownDays > 0
          ? relationship.knownLabel
          : "等待故事开始",
      label: t("penpal.known"),
      value: relationship.knownDays > 0 ? `${relationship.knownDays}` : "—",
      unit: relationship.knownDays > 0 ? "天" : "",
      icon: CalendarDays,
    },
    {
      detail: relationship.receivedLabel,
      label: t("penpal.received"),
      value: relationship.lettersReceived > 0 ? `${relationship.lettersReceived}` : "—",
      unit: relationship.lettersReceived > 0 ? "封" : "",
      icon: Mail,
    },
    {
      detail: relationship.sentLabel,
      label: t("penpal.sent"),
      value: relationship.lettersSent > 0 ? `${relationship.lettersSent}` : "—",
      unit: relationship.lettersSent > 0 ? "封" : "",
      icon: Send,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-border/70 bg-paper-soft/88 px-5 py-5 shadow-[0_14px_32px_rgba(86,62,33,0.1)]">
      <motion.div
        animate={{ opacity: [0.12, 0.26, 0.12], x: [-8, 8, -8] }}
        className="absolute inset-x-[-20%] bottom-[-42px] h-24 rounded-full bg-lake-blue/18 blur-3xl"
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[19px] font-semibold leading-7 text-ink">{t("penpal.relationship")}</h2>
          <p className="mt-1 text-xs leading-5 text-ink-muted">
            {relationship.storyBody}
          </p>
        </div>
        <div className="grid size-11 shrink-0 place-items-center rounded-full border border-border/70 bg-paper-deep/54 text-olive-deep">
          <Waves className="size-5" strokeWidth={1.5} />
        </div>
      </div>
      <div className="relative z-10 mt-4 grid grid-cols-3 gap-3">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              animate={{ y: [0, index % 2 === 0 ? -1.5 : -1, 0] }}
              className="rounded-card border border-border/70 bg-paper-deep/44 px-2 py-3.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]"
              key={item.label}
              transition={{
                delay: index * 0.3,
                duration: 4.8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <Icon className="mx-auto size-4 text-olive-deep" />
              <p className="mt-2 text-[11px] leading-4 text-ink-muted">{item.label}</p>
              <p className="mt-1 text-[20px] font-semibold leading-6 text-ink">
                {item.value}
                {item.unit ? <span className="ml-0.5 text-xs text-ink-muted">{item.unit}</span> : null}
              </p>
              <p className="mx-auto mt-1 line-clamp-2 max-w-[82px] text-[10px] leading-4 text-ink-muted/72">
                {item.detail}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

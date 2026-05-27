"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import type { Penpal } from "@/src/lib/db/penpals";
import { useI18n } from "@/src/i18n/useI18n";
import { PaperCard } from "@/components/shared/PaperCard";
import { WashiTape } from "@/components/decorative/WashiTape";

type PenpalAboutCardProps = {
  penpal: Penpal;
};

const stickerAngles = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0"];
const stickerSizes = ["px-3.5 py-2", "px-3 py-1.5", "px-4 py-2", "px-3 py-1.5"];

function StickerTag({ index, label }: { index: number; label: string }) {
  return (
    <motion.span
      className={`${stickerAngles[index % stickerAngles.length]} ${stickerSizes[index % stickerSizes.length]} inline-flex min-h-9 items-center rounded-[14px] border border-border/70 bg-paper-soft/82 text-xs font-medium text-ink-muted shadow-[0_6px_14px_rgba(86,62,33,0.07)]`}
      whileHover={{
        backgroundColor: "rgba(230, 237, 207, 0.74)",
        scale: 1.02,
        y: -1,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {label}
    </motion.span>
  );
}

export function PenpalAboutCard({ penpal }: PenpalAboutCardProps) {
  const { t } = useI18n();

  return (
    <PaperCard className="relative space-y-5 overflow-visible px-5 py-5 shadow-[0_14px_34px_rgba(86,62,33,0.1)]">
      <WashiTape className="absolute -top-2 right-9 h-4 w-16 opacity-45" tone="blue" />
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-olive-deep" />
          <h2 className="text-[19px] font-semibold leading-7 text-ink">{t("penpal.about")}</h2>
        </div>
        <div className="relative rounded-[18px] border border-border/68 bg-[#fffaf0]/68 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.48)]">
          <Quote className="absolute -left-1 -top-2 size-8 rotate-180 text-olive/18" />
          <p className="text-[15px] leading-8 text-ink-muted">{penpal.intro}</p>
        </div>
      </div>
      <div className="relative rounded-card border border-border/80 bg-paper-deep/38 px-4 py-4">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted/75">
          {t("penpal.corner")}
        </p>
        <p className="mt-2 text-[15px] leading-8 text-ink">{penpal.roomDescription}</p>
      </div>
      <div className="space-y-3 pt-1">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted/75">
          {t("penpal.favoriteThings")}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {penpal.favoriteThings.map((item, index) => (
            <StickerTag index={index} key={item} label={item} />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-muted/75">
          {t("penpal.topics")}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {penpal.topics.map((item, index) => (
            <StickerTag index={index + penpal.favoriteThings.length} key={item} label={item} />
          ))}
        </div>
      </div>
    </PaperCard>
  );
}

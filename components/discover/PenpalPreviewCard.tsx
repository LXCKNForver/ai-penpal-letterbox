"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { TagPill } from "@/components/shared/TagPill";
import { useI18n } from "@/src/i18n/useI18n";

type PenpalPreviewCardProps = {
  penpal: MockPenpal;
};

export function PenpalPreviewCard({ penpal }: PenpalPreviewCardProps) {
  const { t } = useI18n();

  return (
    <motion.div
      animate={{
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
      }}
      initial={{
        filter: "blur(6px)",
        opacity: 0,
        y: 20,
      }}
      transition={{ duration: 0.62, ease: "easeOut" }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={`/penpals/${penpal.id}`}
        className="relative block rounded-card border border-border bg-paper-soft/95 p-card shadow-paper transition-[border-color,box-shadow] duration-300 hover:border-[#e6d4ae] hover:shadow-[0_14px_30px_rgba(89,64,33,0.13)] active:translate-y-px"
      >
        <div className="flex items-start gap-3">
          <div
            className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-paper-soft text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: penpal.color }}
          >
            {penpal.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="truncate text-base font-semibold text-ink">{penpal.name}</h2>
              <span className="text-xs text-ink-muted">{penpal.age}</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-muted">{penpal.location}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
              {penpal.bio}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {penpal.tags.map((tag) => (
            <motion.span
              className="inline-flex"
              key={tag}
              transition={{ duration: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <TagPill className="transition-colors duration-300 hover:bg-[#f4e8c9]">
                {tag}
              </TagPill>
            </motion.span>
          ))}
        </div>
        <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-olive-deep">
          {t("discover.corner")}
          <ArrowRight className="size-3.5" />
        </div>
      </Link>
    </motion.div>
  );
}

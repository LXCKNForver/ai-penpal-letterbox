"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Penpal } from "@/src/lib/db/penpals";
import type { PenpalRelationshipSummary } from "@/src/lib/relationship";
import { Stamp } from "@/components/decorative/Stamp";
import { WashiTape } from "@/components/decorative/WashiTape";

type PenpalHeroCardProps = {
  penpal: Penpal;
  relationship: PenpalRelationshipSummary;
};

export function PenpalHeroCard({ penpal, relationship }: PenpalHeroCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border/70 bg-paper-soft/92 p-5 shadow-[0_18px_44px_rgba(86,62,33,0.13)]">
      <motion.div
        animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.94, 1.05, 0.94] }}
        className="absolute -right-12 -top-12 size-36 rounded-full bg-moon/30 blur-2xl"
        transition={{ duration: 7.8, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(255,255,255,0.72),transparent_28%),linear-gradient(135deg,rgba(126,96,48,0.07)_0_1px,transparent_1px_13px)]" />
      <WashiTape className="absolute left-10 top-2 h-5 w-16 opacity-60" tone="sand" />
      <Stamp
        className="absolute right-5 top-5 rotate-[8deg] opacity-70"
        color={penpal.color}
        label="PAL"
      />
      <div className="relative z-10 flex items-start gap-4 pt-3">
        <motion.div
          animate={{ rotate: [0, -1.2, 1, 0], y: [0, -3, 0] }}
          className="grid size-20 shrink-0 place-items-center rounded-full border-4 border-paper-soft text-xl font-semibold text-white shadow-[0_14px_28px_rgba(86,62,33,0.14)]"
          style={{ backgroundColor: penpal.color }}
          transition={{ duration: 5.8, ease: "easeInOut", repeat: Infinity }}
        >
          {penpal.avatarLabel}
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-1.5 rounded-pill border border-border/70 bg-paper/52 px-2.5 py-1 text-[12px] leading-4 text-ink-muted">
            <MapPin className="size-3" />
            {penpal.country} · {penpal.city}
          </p>
          <h1 className="mt-1.5 text-[28px] font-semibold leading-8 text-ink">
            {penpal.name}
          </h1>
          <p className="mt-2 text-[15px] leading-5 text-ink-muted">
            {penpal.age} 岁
          </p>
        </div>
      </div>
      <blockquote className="relative z-10 mt-6 rounded-card border border-border/70 bg-paper-deep/38 px-4 py-4 text-[15px] leading-8 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.38)]">
        <span className="absolute -left-1 top-1 text-5xl leading-none text-olive/18">“</span>
        <span className="relative">{penpal.quote}</span>
      </blockquote>
      <div className="relative z-10 mt-4 rounded-card border border-olive-deep/15 bg-olive-soft/54 px-4 py-3">
        <p className="text-sm font-semibold leading-6 text-olive-deep">
          {relationship.storyTitle}
        </p>
        <p className="mt-1 text-xs leading-5 text-ink-muted">
          {relationship.storyBody}
        </p>
      </div>
    </section>
  );
}

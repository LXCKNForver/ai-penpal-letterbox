"use client";

import Link from "next/link";
import { PenTool } from "lucide-react";
import { motion } from "framer-motion";
import type { Penpal } from "@/src/lib/db/penpals";
import type { PenpalRelationshipSummary } from "@/src/lib/relationship";
import { motionEaseOut } from "@/src/lib/motion";
import { PenpalAboutCard } from "@/components/penpals/PenpalAboutCard";
import { PenpalCornerAmbient } from "@/components/penpals/PenpalCornerAmbient";
import { PenpalHeroCard } from "@/components/penpals/PenpalHeroCard";
import { PenpalRecentLetters } from "@/components/penpals/PenpalRecentLetters";
import { PenpalRelationshipCard } from "@/components/penpals/PenpalRelationshipCard";

type PenpalDetailContentProps = {
  penpal: Penpal;
  relationship: PenpalRelationshipSummary;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { filter: "blur(6px)", opacity: 0, y: 18 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.62, ease: motionEaseOut },
    y: 0,
  },
};

export function PenpalDetailContent({ penpal, relationship }: PenpalDetailContentProps) {
  return (
    <motion.div
      animate="visible"
      className="relative space-y-6 pb-2"
      initial="hidden"
      variants={containerVariants}
    >
      <PenpalCornerAmbient />
      <motion.div className="relative z-10" variants={itemVariants}>
        <PenpalHeroCard penpal={penpal} relationship={relationship} />
      </motion.div>
      <motion.div className="relative z-10" variants={itemVariants}>
        <PenpalRelationshipCard relationship={relationship} />
      </motion.div>
      <motion.div className="relative z-10" variants={itemVariants}>
        <PenpalAboutCard penpal={penpal} />
      </motion.div>
      <motion.div className="relative z-10" variants={itemVariants}>
        <PenpalRecentLetters relationship={relationship} />
      </motion.div>
      <motion.div
        animate={{ boxShadow: ["0 10px 22px rgba(89,103,55,0.20)", "0 14px 28px rgba(89,103,55,0.26)", "0 10px 22px rgba(89,103,55,0.20)"] }}
        className="relative z-10 rounded-button"
        transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
        variants={itemVariants}
      >
        <Link
          href={`/letters/new?penpalId=${penpal.id}`}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button transition active:scale-[0.985]"
        >
          <PenTool className="size-4" />
          给 {penpal.name} 写信
        </Link>
      </motion.div>
    </motion.div>
  );
}

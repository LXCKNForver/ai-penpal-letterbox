"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DelayedLoading } from "@/src/components/loading/DelayedLoading";
import { FloatingBottleLoading } from "@/src/components/loading/FloatingBottleLoading";
import { SkeletonCard } from "@/src/components/loading/SkeletonCard";

type LetterLoadingProps = {
  className?: string;
  count?: number;
  message?: string;
  variant?: "letter" | "penpal" | "profile";
};

export function LetterLoading({
  className,
  count = 3,
  message = "正在整理远方来信…",
  variant = "letter",
}: LetterLoadingProps) {
  return (
    <DelayedLoading>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={cn("space-y-4", className)}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        <div className="rounded-card border border-border/60 bg-paper-soft/78 px-4 py-5 text-center shadow-paper">
          <FloatingBottleLoading label={message} size="sm" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: count }, (_, index) => (
            <SkeletonCard key={index} variant={variant} />
          ))}
        </div>
      </motion.div>
    </DelayedLoading>
  );
}

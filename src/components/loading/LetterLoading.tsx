"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DelayedLoading } from "@/src/components/loading/DelayedLoading";
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
        <div className="rounded-card border border-border/60 bg-paper-soft/72 px-4 py-3 text-center shadow-paper">
          <div className="mx-auto mb-2 flex w-fit gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <span
                className="size-1.5 animate-pulse rounded-full bg-olive/65"
                key={index}
                style={{ animationDelay: `${index * 120}ms` }}
              />
            ))}
          </div>
          <p className="text-sm leading-6 text-ink-muted">{message}</p>
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

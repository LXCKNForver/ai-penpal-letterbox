"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SkeletonCardProps = {
  className?: string;
  variant?: "letter" | "penpal" | "profile";
};

function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-full bg-paper-deep/78", className)}>
      <motion.span
        animate={{ x: ["-45%", "145%"] }}
        className="absolute inset-y-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,248,232,0.48),transparent)]"
        transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

export function SkeletonCard({ className, variant = "letter" }: SkeletonCardProps) {
  if (variant === "profile") {
    return (
      <div
        className={cn(
          "rounded-card border border-border/65 bg-paper-soft/82 p-4 shadow-paper",
          className
        )}
      >
        <ShimmerBlock className="h-5 w-32" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <ShimmerBlock className="h-16 rounded-card" />
          <ShimmerBlock className="h-16 rounded-card" />
          <ShimmerBlock className="h-16 rounded-card" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-card border border-border/60 bg-paper-soft/84 p-4 shadow-[0_8px_18px_rgba(89,64,33,0.07)]",
        className
      )}
    >
      <div className="flex items-center gap-3.5">
        <ShimmerBlock
          className={cn(
            "shrink-0 rounded-[16px]",
            variant === "penpal" ? "size-14 rounded-full" : "size-14"
          )}
        />
        <div className="min-w-0 flex-1 space-y-2.5">
          <ShimmerBlock className="h-4 w-3/4" />
          <ShimmerBlock className="h-3 w-1/2" />
          <ShimmerBlock className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
}

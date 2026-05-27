"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DelayedLoading } from "@/src/components/loading/DelayedLoading";
import { FloatingBottleLoading } from "@/src/components/loading/FloatingBottleLoading";

type AppLoadingProps = {
  className?: string;
  message?: string;
  tone?: "paper" | "night";
};

export function AppLoading({
  className,
  message = "正在打开信箱…",
  tone = "paper",
}: AppLoadingProps) {
  const isNight = tone === "night";

  return (
    <DelayedLoading>
      <main
        aria-busy="true"
        aria-label={message}
        className={cn(
          "relative grid min-h-svh place-items-center overflow-hidden px-8 text-center supports-[height:100dvh]:min-h-dvh",
          isNight ? "bg-[#071426] text-[#fff8e8]" : "bg-paper text-ink",
          className
        )}
      >
        <motion.div
          animate={{ opacity: [0.16, 0.28, 0.16], scale: [0.96, 1.04, 0.96] }}
          aria-hidden="true"
          className={cn(
            "absolute h-64 w-64 rounded-full blur-3xl",
            isNight ? "bg-[#f7e9b9]/24" : "bg-moon/40"
          )}
          transition={{ duration: 5.8, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="relative z-10 rounded-paper border border-border/55 bg-paper-soft/80 px-8 py-9 shadow-floating backdrop-blur-[1px]">
          <FloatingBottleLoading label={message} size="lg" />
        </div>
      </main>
    </DelayedLoading>
  );
}

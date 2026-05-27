"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageFadeSlide } from "@/src/lib/motion";

type MobilePageTransitionProps = {
  children: ReactNode;
};

export function MobilePageTransition({ children }: MobilePageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div key={pathname} className="min-h-full" {...pageFadeSlide}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

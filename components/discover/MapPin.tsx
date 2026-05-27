"use client";

import { motion } from "framer-motion";
import { MapPin as Pin } from "lucide-react";
import { cn } from "@/lib/utils";

type MapPinProps = {
  top: string;
  left: string;
  active?: boolean;
  color?: string;
  label: string;
  onClick: () => void;
};

export function MapPin({
  top,
  left,
  active,
  color = "#8c9a63",
  label,
  onClick,
}: MapPinProps) {
  return (
    <motion.button
      animate={{
        opacity: active ? [0.95, 1, 0.95] : [0.86, 0.96, 0.86],
        scale: active ? [1, 1.06, 1] : [1, 1.04, 1],
      }}
      className={cn(
        "absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-paper-soft bg-paper-soft/92 shadow-[0_5px_12px_rgba(75,54,28,0.13)]",
        active ? "size-12" : "size-11"
      )}
      style={{ top, left, color }}
      transition={{ duration: active ? 3.2 : 3.8, ease: "easeInOut", repeat: Infinity }}
      type="button"
      whileHover={{
        boxShadow: "0 10px 20px rgba(75,54,28,0.18)",
        scale: 1.08,
        y: -2,
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-label={`选择 ${label}`}
    >
      <motion.span
        animate={{ opacity: [0.24, 0], scale: [0.85, 1.75] }}
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-current"
        transition={{ duration: 3.6, ease: "easeOut", repeat: Infinity }}
      />
      <motion.span
        animate={{ opacity: [0.14, 0], scale: [0.7, 1.45] }}
        aria-hidden="true"
        className="absolute inset-1 rounded-full border border-current"
        transition={{ delay: 1.1, duration: 3.8, ease: "easeOut", repeat: Infinity }}
      />
      <Pin
        className={cn("relative z-10", active ? "size-[22px]" : "size-[18px]")}
        fill="currentColor"
        strokeWidth={1.5}
      />
    </motion.button>
  );
}

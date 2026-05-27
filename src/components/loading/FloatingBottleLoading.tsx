"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingBottleLoadingProps = {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClassName = {
  sm: "h-16 w-14",
  md: "h-24 w-20",
  lg: "h-32 w-28",
};

export function FloatingBottleLoading({
  className,
  label,
  size = "md",
}: FloatingBottleLoadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <motion.div
        animate={{
          rotate: [-1.6, 1.2, -1.6],
          y: [0, -7, 0],
        }}
        className={cn(
          "relative bg-transparent drop-shadow-[0_14px_22px_rgba(89,64,33,0.12)]",
          sizeClassName[size]
        )}
        transition={{ duration: 5.4, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          alt=""
          className="object-contain"
          fill
          sizes={size === "lg" ? "112px" : size === "md" ? "80px" : "56px"}
          src="/assets/auth/bottle1.png"
        />
      </motion.div>
      {label ? (
        <p className="max-w-56 text-sm leading-6 text-ink-muted">{label}</p>
      ) : null}
    </div>
  );
}

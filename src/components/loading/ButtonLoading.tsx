"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonLoadingProps = {
  className?: string;
  label?: string;
  tone?: "light" | "dark";
};

export function ButtonLoading({
  className,
  label = "正在送信…",
  tone = "light",
}: ButtonLoadingProps) {
  const [showMotion, setShowMotion] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowMotion(true), 300);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!showMotion) {
    return <span className={className}>{label}</span>;
  }

  return (
    <span className={cn("inline-flex items-center justify-center gap-2", className)}>
      <motion.span
        animate={{ rotate: [0, -3, 3, 0], y: [0, -1.5, 0] }}
        className={cn(
          "grid size-5 place-items-center rounded-full",
          tone === "light" ? "bg-paper-soft/18 text-paper-soft" : "bg-olive-soft text-olive-deep"
        )}
        transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
      >
        <Mail className="size-3.5" strokeWidth={1.6} />
      </motion.span>
      <span>{label}</span>
      <span aria-hidden="true" className="inline-flex items-center gap-0.5 pl-0.5">
        {[0, 1, 2].map((item) => (
          <motion.span
            animate={{ opacity: [0.28, 1, 0.28], y: [0, -2, 0] }}
            className={cn(
              "size-1 rounded-full",
              tone === "light" ? "bg-paper-soft" : "bg-olive-deep"
            )}
            key={item}
            transition={{
              delay: item * 0.16,
              duration: 1.1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </span>
    </span>
  );
}

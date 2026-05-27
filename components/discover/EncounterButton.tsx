"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";
import { cn } from "@/lib/utils";
import { ButtonLoading } from "@/src/components/loading";

type EncounterButtonProps = {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  label: string;
  onClick: () => void;
};

export function EncounterButton({
  className,
  disabled,
  isLoading,
  label,
  onClick,
}: EncounterButtonProps) {
  return (
    <motion.div
      animate={{
        filter: ["brightness(1)", "brightness(1.035)", "brightness(1)"],
        boxShadow: [
          "0 10px 22px rgba(89,103,55,0.18)",
          "0 15px 30px rgba(89,103,55,0.24)",
          "0 10px 22px rgba(89,103,55,0.18)",
        ],
      }}
      className="rounded-button"
      transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <PrimaryActionButton
        className={cn("w-full", className)}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isLoading ? (
          <ButtonLoading label="正在辨认远方的信号…" />
        ) : (
          <>
            <motion.span
              animate={{ x: [0, 2, 0, -1, 0], y: [0, -1, 0] }}
              className="inline-flex"
              transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
            >
              <Send className="size-4" />
            </motion.span>
            {label}
          </>
        )}
      </PrimaryActionButton>
    </motion.div>
  );
}

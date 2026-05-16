import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PrimaryActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function PrimaryActionButton({
  children,
  className,
  ...props
}: PrimaryActionButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

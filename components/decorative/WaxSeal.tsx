import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type WaxSealProps = {
  className?: string;
  size?: "sm" | "md";
};

export function WaxSeal({ className, size = "md" }: WaxSealProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid place-items-center rounded-full bg-[#a75f4e] text-[#f8e8c8] shadow-[inset_0_-4px_8px_rgba(76,34,26,0.25),0_4px_10px_rgba(82,43,34,0.18)]",
        size === "sm" ? "size-8" : "size-11",
        className
      )}
    >
      <Heart className={size === "sm" ? "size-3.5" : "size-4"} fill="currentColor" />
    </span>
  );
}

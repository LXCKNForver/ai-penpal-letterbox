import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type StampProps = {
  className?: string;
  color?: string;
  label?: string;
};

export function Stamp({ className, color = "#c58f7a", label = "AIR" }: StampProps) {
  return (
    <span
      className={cn(
        "grid size-11 place-items-center rounded-[7px] border border-dashed border-[#8b6d4a]/50 bg-[#fff6df] text-[9px] font-semibold uppercase text-[#785d3f] shadow-sm",
        className
      )}
      style={{ boxShadow: `inset 0 0 0 4px ${color}22` }}
    >
      <Mail className="mb-0.5 size-4" style={{ color }} />
      {label}
    </span>
  );
}

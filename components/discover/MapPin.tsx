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

export function MapPin({ top, left, active, color = "#8c9a63", label, onClick }: MapPinProps) {
  return (
    <button
      className={cn(
        "absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-paper-soft bg-paper-soft/92 shadow-[0_5px_12px_rgba(75,54,28,0.13)] transition",
        active ? "size-12" : "size-10"
      )}
      style={{ top, left, color }}
      type="button"
      onClick={onClick}
      aria-label={`选择 ${label}`}
    >
      <Pin className={active ? "size-[22px]" : "size-[18px]"} fill="currentColor" strokeWidth={1.5} />
    </button>
  );
}

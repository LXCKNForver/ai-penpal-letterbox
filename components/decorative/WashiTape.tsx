import { cn } from "@/lib/utils";

type WashiTapeProps = {
  className?: string;
  tone?: "sage" | "sand" | "rose" | "blue";
};

const tones = {
  sage: "bg-[#d8dfbd]",
  sand: "bg-[#ead8b7]",
  rose: "bg-[#e7c1b1]",
  blue: "bg-[#c8d7dc]",
};

export function WashiTape({ className, tone = "sand" }: WashiTapeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-6 w-20 rotate-[-4deg] rounded-[3px] border border-white/40 opacity-85 shadow-sm",
        "bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_0_8px,transparent_8px_16px)]",
        tones[tone],
        className
      )}
    />
  );
}

import { cn } from "@/lib/utils";

type PaperNoiseProps = {
  className?: string;
};

export function PaperNoise({ className }: PaperNoiseProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(63,52,40,0.05)_0_1px,transparent_1px_22px),radial-gradient(circle_at_80%_60%,rgba(63,52,40,0.04)_0_1px,transparent_1px_28px)]",
        className
      )}
    />
  );
}

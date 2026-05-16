import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type BackgroundEnvelopeProps = {
  className?: string;
};

export function BackgroundEnvelope({ className }: BackgroundEnvelopeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute grid size-20 place-items-center rounded-card border border-border/40 bg-paper-soft/35 text-ink-muted/25 shadow-paper",
        className
      )}
    >
      <Mail className="size-10" strokeWidth={1.25} />
    </div>
  );
}

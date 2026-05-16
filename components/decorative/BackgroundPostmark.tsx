import { cn } from "@/lib/utils";

type BackgroundPostmarkProps = {
  className?: string;
};

export function BackgroundPostmark({ className }: BackgroundPostmarkProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-28 rounded-full border border-dashed border-ink-muted/20 text-ink-muted/20",
        className
      )}
    >
      <div className="absolute inset-3 rounded-full border border-ink-muted/10" />
      <div className="absolute left-1/2 top-1/2 h-px w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] bg-ink-muted/14" />
      <div className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 translate-y-3 rotate-[-12deg] bg-ink-muted/12" />
    </div>
  );
}

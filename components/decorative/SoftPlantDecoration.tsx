import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

type SoftPlantDecorationProps = {
  className?: string;
};

export function SoftPlantDecoration({ className }: SoftPlantDecorationProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute text-olive/20", className)}>
      <Leaf className="absolute left-0 top-4 size-8 rotate-[-28deg]" strokeWidth={1.2} />
      <Leaf className="absolute left-5 top-0 size-7 rotate-[16deg]" strokeWidth={1.2} />
      <Leaf className="absolute left-8 top-8 size-6 rotate-[42deg]" strokeWidth={1.2} />
      <div className="absolute left-6 top-5 h-16 w-px rotate-[18deg] bg-olive/14" />
    </div>
  );
}

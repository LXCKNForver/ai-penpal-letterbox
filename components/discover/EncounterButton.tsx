import { Send } from "lucide-react";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";
import { cn } from "@/lib/utils";

type EncounterButtonProps = {
  className?: string;
};

export function EncounterButton({ className }: EncounterButtonProps) {
  return (
    <PrimaryActionButton className={cn("w-full", className)}>
      <Send className="size-4" />
       继续探索远方的信号
    </PrimaryActionButton>
  );
}

import { Send } from "lucide-react";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";
import { cn } from "@/lib/utils";

type EncounterButtonProps = {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  label: string;
  onClick: () => void;
};

export function EncounterButton({
  className,
  disabled,
  isLoading,
  label,
  onClick,
}: EncounterButtonProps) {
  return (
    <PrimaryActionButton
      className={cn("w-full", className)}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      <Send className="size-4" />
      {isLoading ? "正在辨认远方的信号" : label}
    </PrimaryActionButton>
  );
}

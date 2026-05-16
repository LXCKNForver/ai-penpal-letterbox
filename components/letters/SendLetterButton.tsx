"use client";

import { useState } from "react";
import { MailPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";

type SendLetterButtonProps = {
  disabled?: boolean;
  penpalId?: string;
};

export function SendLetterButton({ disabled, penpalId = "luna" }: SendLetterButtonProps) {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  function handleSend() {
    if (disabled || isSending) {
      return;
    }

    setIsSending(true);
    window.setTimeout(() => {
      router.push(`/letters/waiting?penpalId=${penpalId}`);
    }, 900);
  }

  return (
    <PrimaryActionButton
      className="min-h-12 w-full border border-olive-deep/20"
      disabled={disabled || isSending}
      onClick={handleSend}
    >
      <MailPlus className={isSending ? "size-4 opacity-75" : "size-4"} />
      {isSending ? "\u6b63\u5728\u628a\u4fe1\u653e\u8fdb\u90ae\u7b52" : "\u5bc4\u51fa\u4fe1\u4ef6"}
    </PrimaryActionButton>
  );
}

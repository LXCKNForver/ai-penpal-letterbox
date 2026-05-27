"use client";

import { useState } from "react";
import { MailPlus } from "lucide-react";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";
import { sendLetter } from "@/app/letters/new/actions";
import { ButtonLoading } from "@/src/components/loading";

type SendLetterButtonProps = {
  content: string;
  disabled?: boolean;
  penpalId?: string;
};

export function SendLetterButton({
  content,
  disabled,
  penpalId = "luna",
}: SendLetterButtonProps) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    if (disabled || isSending) {
      return;
    }

    setIsSending(true);
    setError(null);
    const result = await sendLetter({
      penpalId,
      content,
    });

    if (result?.error) {
      setError(result.error);
      setIsSending(false);
    }
  }

  return (
    <div className="space-y-3">
      {error ? (
        <p className="rounded-card border border-stamp-red/25 bg-stamp-red/10 px-3 py-2 text-xs leading-5 text-ink">
          {error}
        </p>
      ) : null}
      <PrimaryActionButton
        className="min-h-12 w-full border border-olive-deep/20"
        disabled={disabled || isSending}
        onClick={handleSend}
      >
        {isSending ? (
          <ButtonLoading label="正在把信放进邮筒…" />
        ) : (
          <>
            <MailPlus className="size-4" />
            {"\u5bc4\u51fa\u4fe1\u4ef6"}
          </>
        )}
      </PrimaryActionButton>
    </div>
  );
}

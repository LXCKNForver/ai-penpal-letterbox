"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { LetterEditor } from "@/components/letters/LetterEditor";
import { LetterPaper } from "@/components/letters/LetterPaper";
import { PrimaryActionButton } from "@/components/shared/PrimaryActionButton";
import { sendUnknownLetter } from "@/app/letters/unknown/actions";
import { ButtonLoading } from "@/src/components/loading";

export function UnknownLetterForm() {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const isDisabled = content.trim().length < 8 || isPending;

  function handleSend() {
    if (isDisabled) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await sendUnknownLetter(content);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="space-y-4">
      <LetterPaper to="未知远方">
        <LetterEditor value={content} onChange={setContent} />
      </LetterPaper>

      {error ? (
        <p className="rounded-card border border-stamp-red/25 bg-stamp-red/10 px-3 py-2 text-xs leading-5 text-ink">
          {error}
        </p>
      ) : null}

      <PrimaryActionButton
        className="min-h-12 w-full border border-olive-deep/20"
        disabled={isDisabled}
        onClick={handleSend}
      >
        {isPending ? (
          <ButtonLoading label="正在把信寄向未知远方…" />
        ) : (
          <>
            <Send className="size-4" />
            {"把信寄向未知远方"}
          </>
        )}
      </PrimaryActionButton>
    </div>
  );
}

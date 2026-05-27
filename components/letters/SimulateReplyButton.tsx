"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";
import { ButtonLoading } from "@/src/components/loading";

type SimulateReplyButtonProps = {
  letterId: string;
};

type GenerateReplyResponse = {
  error?: string;
  success: boolean;
  reason?: string;
  replyId?: string;
};

export function SimulateReplyButton({ letterId }: SimulateReplyButtonProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [activeMode, setActiveMode] = useState<"timed" | "force" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generateReply(force: boolean) {
    if (isCreating) {
      return;
    }

    setIsCreating(true);
    setActiveMode(force ? "force" : "timed");
    setError(null);

    try {
      const response = await fetch("/api/replies/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ letterId, force }),
      });
      const result = (await response.json()) as GenerateReplyResponse;

      if (result.success && result.replyId) {
        router.refresh();
        router.push(`/inbox?tab=sent&newReplyId=${result.replyId}`);
        return;
      }

      if (result.reason === "too_early") {
        setError("回信还在路上，晚一点再看看吧。");
      } else {
        const detail = result.error || result.reason || "unknown_error";
        setError(`回信暂时没有寄到，请稍后再试。（${detail}）`);
      }
    } catch (error) {
      setError(
        `回信暂时没有寄到，请稍后再试。（${
          error instanceof Error ? error.message : "network_error"
        }）`
      );
    } finally {
      setIsCreating(false);
      setActiveMode(null);
    }
  }

  return (
    <div className="space-y-2">
      {error ? (
        <p className="rounded-card border border-stamp-red/25 bg-stamp-red/10 px-3 py-2 text-xs leading-5 text-ink">
          {error}
        </p>
      ) : null}
      <div className="grid gap-2">
        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-border/75 bg-paper-soft/85 px-5 text-sm font-semibold text-ink shadow-[0_8px_18px_rgba(89,64,33,0.09)] transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isCreating}
          type="button"
          onClick={() => generateReply(false)}
        >
          {isCreating && activeMode === "timed" ? (
            <ButtonLoading label="正在检查远方来信…" tone="dark" />
          ) : (
            <>
              <MailCheck className="size-4" />
              {"模拟收到回信（按时间）"}
            </>
          )}
        </button>
        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button transition active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isCreating}
          type="button"
          onClick={() => generateReply(true)}
        >
          {isCreating && activeMode === "force" ? (
            <ButtonLoading label="正在投递回信…" />
          ) : (
            <>
              <MailCheck className="size-4" />
              {"强制收到回信"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

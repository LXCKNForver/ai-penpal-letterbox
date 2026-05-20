import type { LetterReplySummary, LetterWithPenpal } from "@/types/letter";

export type LetterWaitingStage =
  | "drifting"
  | "arrived"
  | "writing"
  | "replied"
  | "failed";

type StageLetter = Pick<LetterWithPenpal, "status"> & {
  createdAt?: string | null;
  created_at?: string | null;
  scheduledReplyAt?: string | null;
  scheduled_reply_at?: string | null;
};

type StageReply = Pick<LetterReplySummary, "id"> | null | undefined;

function getTime(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? null : time;
}

export function getLetterWaitingStage(
  letter: StageLetter,
  reply?: StageReply,
  now: Date = new Date()
): LetterWaitingStage {
  if (letter.status === "replied" && reply) {
    return "replied";
  }

  if (letter.status === "failed") {
    return "failed";
  }

  if (letter.status === "pending") {
    const createdAt = getTime(letter.createdAt ?? letter.created_at);
    const scheduledReplyAt = getTime(
      letter.scheduledReplyAt ?? letter.scheduled_reply_at
    );

    if (!createdAt || !scheduledReplyAt) {
      return scheduledReplyAt && now.getTime() >= scheduledReplyAt
        ? "writing"
        : "drifting";
    }

    const total = scheduledReplyAt - createdAt;

    if (total <= 0) {
      return "writing";
    }

    const progress = (now.getTime() - createdAt) / total;

    if (progress < 0.4) {
      return "drifting";
    }

    if (progress < 0.75) {
      return "arrived";
    }

    return "writing";
  }

  return reply ? "replied" : "writing";
}

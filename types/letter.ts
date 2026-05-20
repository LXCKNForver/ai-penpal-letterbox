import type { Penpal } from "@/src/lib/db/penpals";

export type LetterStatus = "pending" | "replied" | "failed";

export type LetterReplySummary = {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string | null;
};

export type LetterWithPenpal = {
  id: string;
  userId: string;
  penpalId: string;
  content: string;
  status: LetterStatus;
  scheduledReplyAt: string | null;
  replyGenerated: boolean;
  createdAt: string | null;
  penpal: Penpal;
  penpalDiscovered?: boolean;
  reply?: LetterReplySummary | null;
};

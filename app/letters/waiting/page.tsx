import Link from "next/link";
import { Clock3, Inbox, Send } from "lucide-react";
import { WaitingReplyState } from "@/components/letters/WaitingReplyState";
import { AppShell } from "@/components/layout/AppShell";
import { PaperCard } from "@/components/shared/PaperCard";
import { createClient } from "@/lib/supabase/server";
import { getUserLetterById, getUserLetters } from "@/src/lib/db/letters";
import { getReplyByLetterId } from "@/src/lib/db/replies";
import {
  getUserPenpalDiscoveries,
  isPenpalDiscoveredForLetter,
} from "@/src/lib/db/userPenpals";

type WaitingPageProps = {
  searchParams: Promise<{
    letterId?: string;
  }>;
};

function SentLetterFallback() {
  return (
    <div className="min-h-[calc(100svh-var(--bottom-nav-height)-56px)] px-page pb-[calc(1.5rem+var(--safe-area-bottom))] pt-12 supports-[height:100dvh]:min-h-[calc(100dvh-var(--bottom-nav-height)-56px)]">
      <PaperCard className="overflow-hidden border-border/60 bg-olive-soft p-card text-center shadow-floating">
        <div className="mx-auto grid size-20 place-items-center rounded-full border border-border/60 bg-paper-soft text-olive-deep shadow-[0_10px_24px_rgba(89,64,33,0.10)]">
          <Send className="size-8" strokeWidth={1.5} />
        </div>
        <h1 className="mx-auto mt-7 max-w-[300px] text-2xl font-semibold leading-9 text-ink">
          你的信已经发出
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-sm leading-7 text-ink-muted">
          它正在慢慢去往远方。请静静等一等，真诚的回信会在合适的时候抵达。
        </p>
        <div className="mx-auto mt-7 rounded-card border border-border/70 bg-paper-soft/80 px-4 py-3 text-sm leading-6 text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            回信还在路上
          </span>
        </div>
        <div className="mt-8 space-y-3">
          <Link
            href="/inbox"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button"
          >
            <Inbox className="size-4" />
            回到信箱
          </Link>
          <Link
            href="/profile"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-button border border-border bg-paper-soft/70 px-5 text-sm font-medium text-ink-muted transition active:scale-[0.985]"
          >
            今天先写到这里
          </Link>
        </div>
      </PaperCard>
    </div>
  );
}

export default async function WaitingPage({ searchParams }: WaitingPageProps) {
  const { letterId } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [letter, reply, penpalDiscoveries] =
    user
      ? await Promise.all([
          letterId ? getUserLetterById(user.id, letterId) : null,
          letterId ? getReplyByLetterId({ letterId, userId: user.id }) : null,
          getUserPenpalDiscoveries(user.id),
        ])
      : [null, null, []];
  const discoveriesByPenpalId = new Map(
    penpalDiscoveries.map((discovery) => [
      discovery.penpalId,
      discovery.discoveredAt,
    ])
  );
  const fallbackLetter =
    !letter && user
      ? (await getUserLetters(user.id)).find((item) => item.status === "pending") ?? null
      : null;
  const waitingLetter = letter ?? fallbackLetter;
  const waitingReply =
    letter && reply
      ? {
          id: reply.id,
          content: reply.content,
          isRead: reply.isRead,
          createdAt: reply.createdAt,
        }
      : null;

  return (
    <AppShell>
      {waitingLetter ? (
        <WaitingReplyState
          letter={{
            ...waitingLetter,
            penpalDiscovered:
              waitingLetter.status === "replied"
                ? Boolean(waitingReply)
                : discoveriesByPenpalId.has(waitingLetter.penpalId) &&
                  isPenpalDiscoveredForLetter({
                    discoveredAt: discoveriesByPenpalId.get(waitingLetter.penpalId),
                    letterCreatedAt: waitingLetter.createdAt,
                  }),
            reply: waitingLetter.id === letter?.id ? waitingReply : null,
          }}
        />
      ) : (
        <SentLetterFallback />
      )}
    </AppShell>
  );
}

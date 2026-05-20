import Image from "next/image";
import { PaperNoise } from "@/components/decorative/PaperNoise";
import { InboxContent } from "@/components/inbox/InboxContent";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { createClient } from "@/lib/supabase/server";
import { getUserLetters } from "@/src/lib/db/letters";
import { getRepliesByUser } from "@/src/lib/db/replies";
import {
  getUserPenpalDiscoveries,
  getUserPenpals,
  isPenpalDiscoveredForLetter,
} from "@/src/lib/db/userPenpals";
import inboxBackground from "@/.docs/bg1.png";

type InboxPageProps = {
  searchParams: Promise<{
    newReplyId?: string;
    tab?: string;
  }>;
};

export default async function InboxPage({ searchParams }: InboxPageProps) {
  const { newReplyId, tab } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [penpals, penpalDiscoveries, letters, replies] = user
    ? await Promise.all([
        getUserPenpals(user.id),
        getUserPenpalDiscoveries(user.id),
        getUserLetters(user.id),
        getRepliesByUser(user.id),
      ])
    : [[], [], [], []];
  const repliesByLetterId = new Map(
    replies.map((reply) => [
      reply.letterId,
      {
        id: reply.id,
        content: reply.content,
        isRead: reply.isRead,
        createdAt: reply.createdAt,
      },
    ])
  );
  const discoveriesByPenpalId = new Map(
    penpalDiscoveries.map((discovery) => [
      discovery.penpalId,
      discovery.discoveredAt,
    ])
  );
  const lettersWithReplies = letters.map((letter) => ({
    ...letter,
    penpalDiscovered:
      letter.status === "replied"
        ? Boolean(repliesByLetterId.get(letter.id))
        : discoveriesByPenpalId.has(letter.penpalId) &&
          isPenpalDiscoveredForLetter({
            discoveredAt: discoveriesByPenpalId.get(letter.penpalId),
            letterCreatedAt: letter.createdAt,
          }),
    reply: repliesByLetterId.get(letter.id) ?? null,
  }));

  return (
    <AppShell>
      <div className="relative min-h-[calc(100dvh-96px)] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
          <Image
            src={inboxBackground}
            alt=""
            fill
            priority
            sizes="430px"
            className="object-cover object-top opacity-88"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,239,217,0.06)_0%,rgba(248,239,217,0.12)_44%,rgba(248,239,217,0.72)_78%,var(--paper)_100%)]" />
        </div>
        <PaperNoise className="opacity-24" />
        <MobileHeader
          title={"\u6211\u7684\u4fe1\u7bb1"}
          subtitle={"\u67e5\u770b\u6765\u4fe1\u548c\u56de\u4fe1"}
          className="relative z-10 [&_button]:bg-paper-soft/70 [&_button]:shadow-sm [&_h1]:drop-shadow-[0_1px_0_rgba(255,248,232,0.75)] [&_p]:drop-shadow-[0_1px_0_rgba(255,248,232,0.75)]"
        />
        <PageContainer className="relative z-10">
          <InboxContent
            hasPenpals={penpals.length > 0}
            initialTab={tab === "sent" ? "sent" : "inbox"}
            letters={lettersWithReplies}
            newReplyId={newReplyId}
          />
        </PageContainer>
      </div>
    </AppShell>
  );
}

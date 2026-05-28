import Image from "next/image";
import { PaperNoise } from "@/components/decorative/PaperNoise";
import { InboxAmbientMotion } from "@/components/inbox/InboxAmbientMotion";
import { InboxContent } from "@/components/inbox/InboxContent";
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
    <>
      <div className="relative min-h-[calc(100svh-var(--bottom-nav-height))] overflow-x-hidden supports-[height:100dvh]:min-h-[calc(100dvh-var(--bottom-nav-height))]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden">
          <Image
            src="/assets/app/inbox-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,239,217,0.06)_0%,rgba(248,239,217,0.12)_44%,rgba(248,239,217,0.72)_78%,var(--paper)_100%)]" />
          <InboxAmbientMotion />
        </div>
        <PaperNoise className="opacity-24" />
        <MobileHeader
          title={"\u6211\u7684\u4fe1\u7bb1"}
          subtitle={"\u67e5\u770b\u6765\u4fe1\u548c\u56de\u4fe1"}
          titleKey="header.inbox.title"
          subtitleKey="header.inbox.subtitle"
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
    </>
  );
}

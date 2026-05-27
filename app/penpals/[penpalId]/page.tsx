import { PenpalDetailContent } from "@/components/penpals/PenpalDetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { PaperCard } from "@/components/shared/PaperCard";
import { createClient } from "@/lib/supabase/server";
import { getUserLetters } from "@/src/lib/db/letters";
import { getRepliesByUser } from "@/src/lib/db/replies";
import {
  getUserPenpalDiscoveries,
  getUserPenpals,
} from "@/src/lib/db/userPenpals";
import { derivePenpalRelationshipSummary } from "@/src/lib/relationship";

type PenpalDetailPageProps = {
  params: Promise<{
    penpalId: string;
  }>;
};

export default async function PenpalDetailPage({ params }: PenpalDetailPageProps) {
  const { penpalId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [penpals, letters, replies, discoveries] = user
    ? await Promise.all([
        getUserPenpals(user.id),
        getUserLetters(user.id),
        getRepliesByUser(user.id),
        getUserPenpalDiscoveries(user.id),
      ])
    : [[], [], [], []];
  const penpal = penpals.find((item) => item.id === penpalId);
  const relationship = derivePenpalRelationshipSummary({
    discoveredAt:
      discoveries.find((discovery) => discovery.penpalId === penpalId)?.discoveredAt ?? null,
    received: replies
      .filter((reply) => reply.penpalId === penpalId)
      .map((reply) => ({
        content: reply.content,
        createdAt: reply.createdAt,
        id: reply.id,
      })),
    sent: letters
      .filter((letter) => letter.penpalId === penpalId)
      .map((letter) => ({
        content: letter.content,
        createdAt: letter.createdAt,
        id: letter.id,
      })),
  });

  return (
    <AppShell>
      <MobileHeader
        title={penpal ? `${penpal.name} 的小角落` : "未知的来信"}
        subtitle={
          penpal
            ? `${penpal.country} · ${penpal.city} · ${relationship.knownLabel}`
            : "一封迷路的信"
        }
        backHref="/discover"
        action="none"
        className="bg-paper/62 shadow-[0_8px_24px_rgba(86,62,33,0.06)]"
      />
      <PageContainer>
        {penpal ? (
          <PenpalDetailContent penpal={penpal} relationship={relationship} />
        ) : (
          <PaperCard className="py-12 text-center">
            <p className="text-base font-semibold text-ink">
              这封信好像寄到了未知的地方。
            </p>
            <p className="mx-auto mt-3 max-w-56 text-sm leading-6 text-ink-muted">
              也许再回到地图上看看，就能找到它要去的路。
            </p>
          </PaperCard>
        )}
      </PageContainer>
    </AppShell>
  );
}

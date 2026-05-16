import { WaitingReplyState } from "@/components/letters/WaitingReplyState";
import { AppShell } from "@/components/layout/AppShell";
import { mockPenpals } from "@/src/lib/mock/penpals";

type WaitingPageProps = {
  searchParams: Promise<{
    penpalId?: string;
  }>;
};

export default async function WaitingPage({ searchParams }: WaitingPageProps) {
  const { penpalId } = await searchParams;
  const penpal =
    mockPenpals.find((item) => item.id === penpalId) ??
    mockPenpals.find((item) => item.id === "luna") ??
    mockPenpals[0];

  return (
    <AppShell>
      <WaitingReplyState penpal={penpal} />
    </AppShell>
  );
}

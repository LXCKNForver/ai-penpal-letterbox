import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <MobileHeader title="我的信箱" subtitle="正在打开远方来信" />
      <PageContainer>
        <LetterLoading className="pt-24" message="正在整理远方来信…" />
      </PageContainer>
    </AppShell>
  );
}

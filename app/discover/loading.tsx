import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <MobileHeader title="探索笔友" subtitle="正在听远方的信号" action="sparkle" />
      <PageContainer>
        <LetterLoading
          className="pt-8"
          count={2}
          message="正在等海风带来新的地址…"
          variant="penpal"
        />
      </PageContainer>
    </AppShell>
  );
}

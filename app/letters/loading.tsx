import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <MobileHeader title="选择笔友" subtitle="正在翻找可写信的地址" backHref="/inbox" action="none" />
      <PageContainer>
        <LetterLoading message="正在翻找远方地址…" variant="penpal" />
      </PageContainer>
    </AppShell>
  );
}

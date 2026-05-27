import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <MobileHeader title="笔友地址" subtitle="正在翻开这位笔友的信纸" backHref="/discover" />
      <PageContainer>
        <LetterLoading count={3} message="正在整理笔友的信件…" variant="penpal" />
      </PageContainer>
    </AppShell>
  );
}

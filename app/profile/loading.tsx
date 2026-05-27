import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <MobileHeader title="我的信箱角落" subtitle="正在整理信件和回忆" />
      <PageContainer>
        <LetterLoading
          className="pt-4"
          count={2}
          message="正在整理你的慢慢信箱…"
          variant="profile"
        />
      </PageContainer>
    </AppShell>
  );
}

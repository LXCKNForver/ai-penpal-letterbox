import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <MobileHeader title="写一封信" subtitle="正在铺好信纸" backHref="/letters" action="none" />
      <PageContainer className="pt-4">
        <LetterLoading count={2} message="正在准备收信人和信纸…" />
      </PageContainer>
    </AppShell>
  );
}

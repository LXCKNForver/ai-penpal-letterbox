import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PaperCard } from "@/components/shared/PaperCard";

export default function ProfileLoading() {
  return (
    <AppShell>
      <PageContainer className="pt-10">
        <PaperCard className="p-5">
          <p className="text-sm leading-6 text-ink-muted">
            {"\u6b63\u5728\u6253\u5f00\u4f60\u7684\u4fe1\u7bb1\u2026\u2026"}
          </p>
        </PaperCard>
      </PageContainer>
    </AppShell>
  );
}

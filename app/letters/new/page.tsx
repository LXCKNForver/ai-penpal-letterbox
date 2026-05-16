import { NewLetterContent } from "@/components/letters/NewLetterContent";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";

type NewLetterPageProps = {
  searchParams: Promise<{
    penpalId?: string;
  }>;
};

export default async function NewLetterPage({ searchParams }: NewLetterPageProps) {
  const { penpalId } = await searchParams;

  return (
    <AppShell>
      <MobileHeader
        title={"\u5199\u4e00\u5c01\u4fe1"}
        subtitle={"\u628a\u60f3\u8bf4\u7684\u8bdd\u6162\u6162\u5bc4\u51fa\u53bb"}
        backHref="/letters"
        action="none"
      />
      <PageContainer className="pt-4">
        <NewLetterContent penpalId={penpalId} />
      </PageContainer>
    </AppShell>
  );
}

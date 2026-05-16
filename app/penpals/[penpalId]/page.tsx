import { PenpalDetailContent } from "@/components/penpals/PenpalDetailContent";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { PaperCard } from "@/components/shared/PaperCard";
import { findMockPenpal } from "@/src/lib/mock/penpals";

type PenpalDetailPageProps = {
  params: Promise<{
    penpalId: string;
  }>;
};

export default async function PenpalDetailPage({ params }: PenpalDetailPageProps) {
  const { penpalId } = await params;
  const penpal = findMockPenpal(penpalId);

  return (
    <AppShell>
      <MobileHeader
        title={penpal ? `${penpal.name} \u7684\u5c0f\u89d2\u843d` : "\u672a\u77e5\u7684\u6765\u4fe1"}
        subtitle={penpal ? `${penpal.country} · ${penpal.city}` : "\u4e00\u5c01\u8ff7\u8def\u7684\u4fe1"}
        backHref="/discover"
        action="none"
      />
      <PageContainer>
        {penpal ? (
          <PenpalDetailContent penpal={penpal} />
        ) : (
          <PaperCard className="py-12 text-center">
            <p className="text-base font-semibold text-ink">
              {"\u8fd9\u5c01\u4fe1\u597d\u50cf\u5bc4\u5230\u4e86\u672a\u77e5\u7684\u5730\u65b9\u3002"}
            </p>
            <p className="mx-auto mt-3 max-w-56 text-sm leading-6 text-ink-muted">
              {"\u4e5f\u8bb8\u518d\u56de\u5230\u5730\u56fe\u4e0a\u770b\u770b\uff0c\u5c31\u80fd\u627e\u5230\u5b83\u8981\u53bb\u7684\u8def\u3002"}
            </p>
          </PaperCard>
        )}
      </PageContainer>
    </AppShell>
  );
}

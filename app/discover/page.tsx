import { PenpalMap } from "@/components/discover/PenpalMap";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockPenpals } from "@/src/lib/mock/penpals";

export default function DiscoverPage() {
  return (
    <AppShell>
      <MobileHeader
        title={"\u63a2\u7d22\u7b14\u53cb"}
        subtitle={"\u5728\u5730\u56fe\u4e0a\u53d1\u73b0\u65b0\u670b\u53cb"}
        action="sparkle"
      />
      <PageContainer className="px-0 pb-0 pt-0">
        <PenpalMap penpals={mockPenpals} />
      </PageContainer>
    </AppShell>
  );
}

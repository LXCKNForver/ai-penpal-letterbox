import { ChoosePenpalContent } from "@/components/letters/ChoosePenpalContent";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";

export default function LettersPage() {
  return (
    <AppShell>
      <MobileHeader
        title={"\u9009\u62e9\u7b14\u53cb"}
        subtitle={"\u4e3a\u4e00\u5c01\u65b0\u4fe1\u627e\u5230\u6536\u4fe1\u4eba"}
        backHref="/inbox"
        action="none"
      />
      <PageContainer>
        <ChoosePenpalContent />
      </PageContainer>
    </AppShell>
  );
}

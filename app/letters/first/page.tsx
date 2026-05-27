import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { PaperCard } from "@/components/shared/PaperCard";
import { FirstLetterForm } from "@/app/letters/first/FirstLetterForm";

export default function FirstLetterPage() {
  return (
    <AppShell>
      <MobileHeader
        title={"\u5199\u7ed9\u8fdc\u65b9\u7684\u7b2c\u4e00\u5c01\u4fe1"}
        subtitle={"\u8fd9\u5c01\u4fe1\u4f1a\u5148\u5bc4\u7ed9\u4e16\u754c"}
        titleKey="header.firstLetter.title"
        subtitleKey="header.firstLetter.subtitle"
        backHref="/discover"
        action="none"
      />
      <PageContainer className="space-y-4 pt-4">
        <PaperCard className="p-4">
          <h1 className="text-xl font-semibold leading-7 text-ink">
            {"\u5199\u7ed9\u8fdc\u65b9\u7684\u7b2c\u4e00\u5c01\u4fe1"}
          </h1>
          <p className="mt-2 text-sm leading-7 text-ink-muted">
            {"\u8fd9\u5c01\u4fe1\u4f1a\u5148\u5bc4\u7ed9\u4e16\u754c\u3002\u5982\u679c\u6709\u4eba\u8bfb\u61c2\u4e86\u5b83\uff0c\u4f60\u4f1a\u9047\u89c1\u7b2c\u4e00\u4f4d\u7b14\u53cb\u3002"}
          </p>
        </PaperCard>
        <FirstLetterForm />
      </PageContainer>
    </AppShell>
  );
}

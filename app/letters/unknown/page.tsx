import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { PaperCard } from "@/components/shared/PaperCard";
import { UnknownLetterForm } from "@/app/letters/unknown/UnknownLetterForm";

export default function UnknownLetterPage() {
  return (
    <AppShell>
      <MobileHeader
        title="写给未知远方"
        subtitle="让一封信先替你出发"
        titleKey="header.unknownLetter.title"
        subtitleKey="header.unknownLetter.subtitle"
        backHref="/discover"
        action="none"
      />
      <PageContainer className="space-y-4 pt-4">
        <PaperCard className="p-4">
          <h1 className="text-xl font-semibold leading-7 text-ink">写给未知远方</h1>
          <p className="mt-2 text-sm leading-7 text-ink-muted">
            这封信会漂向某个你还没认识的人。也许等回信抵达，你会知道 TA 的名字。
          </p>
        </PaperCard>
        <UnknownLetterForm />
      </PageContainer>
    </AppShell>
  );
}

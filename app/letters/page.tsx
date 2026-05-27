import { ChoosePenpalContent } from "@/components/letters/ChoosePenpalContent";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { createClient } from "@/lib/supabase/server";
import { getUserPenpals } from "@/src/lib/db/userPenpals";

export default async function LettersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const penpals = user ? await getUserPenpals(user.id) : [];

  return (
    <AppShell>
      <MobileHeader
        title={"\u9009\u62e9\u7b14\u53cb"}
        subtitle={"\u4e3a\u4e00\u5c01\u65b0\u4fe1\u627e\u5230\u6536\u4fe1\u4eba"}
        titleKey="header.letters.title"
        subtitleKey="header.letters.subtitle"
        backHref="/inbox"
        action="none"
      />
      <PageContainer>
        <ChoosePenpalContent penpals={penpals} />
      </PageContainer>
    </AppShell>
  );
}

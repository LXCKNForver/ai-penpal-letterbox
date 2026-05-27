import { PenpalMap } from "@/components/discover/PenpalMap";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { createClient } from "@/lib/supabase/server";
import { getEncounterStatus } from "@/src/lib/db/encounters";
import { getUserPenpals } from "@/src/lib/db/userPenpals";

export default async function DiscoverPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const [penpals, encounterStatus] = user
    ? await Promise.all([getUserPenpals(user.id), getEncounterStatus(user.id)])
    : [[], null];

  return (
    <AppShell>
      <MobileHeader
        title="探索笔友"
        subtitle="写信，让远方慢慢回应你"
        titleKey="header.discover.title"
        subtitleKey="header.discover.subtitle"
        action="sparkle"
      />
      <PageContainer className="px-0 pb-0 pt-0">
        <PenpalMap encounterStatus={encounterStatus} penpals={penpals} />
      </PageContainer>
    </AppShell>
  );
}

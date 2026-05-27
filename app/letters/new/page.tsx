import Link from "next/link";
import { redirect } from "next/navigation";
import { NewLetterContent } from "@/components/letters/NewLetterContent";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { PaperCard } from "@/components/shared/PaperCard";
import { createClient } from "@/lib/supabase/server";
import { getUserPenpals } from "@/src/lib/db/userPenpals";

type NewLetterPageProps = {
  searchParams: Promise<{
    penpalId?: string;
  }>;
};

export default async function NewLetterPage({ searchParams }: NewLetterPageProps) {
  const { penpalId } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const penpals = user ? await getUserPenpals(user.id) : [];

  if (penpals.length === 0) {
    redirect("/letters/first");
  }

  const recipient = penpalId
    ? penpals.find((penpal) => penpal.id === penpalId)
    : penpals[0];

  return (
    <AppShell>
      <MobileHeader
        title={"\u5199\u4e00\u5c01\u4fe1"}
        subtitle={"\u628a\u60f3\u8bf4\u7684\u8bdd\u6162\u6162\u5bc4\u51fa\u53bb"}
        titleKey="header.write.title"
        subtitleKey="header.write.subtitle"
        backHref="/letters"
        action="none"
      />
      <PageContainer className="pt-4">
        {recipient ? (
          <NewLetterContent recipient={recipient} />
        ) : (
          <PaperCard className="py-10 text-center">
            <h1 className="text-lg font-semibold text-ink">
              {"\u4f60\u8fd8\u6ca1\u6709\u771f\u6b63\u8ba4\u8bc6 TA\u3002"}
            </h1>
            <p className="mx-auto mt-3 max-w-64 text-sm leading-6 text-ink-muted">
              {"\u53ea\u6709\u5df2\u7ecf\u9082\u9005\u7684\u7b14\u53cb\uff0c\u624d\u80fd\u6536\u5230\u4f60\u7684\u4fe1\u3002"}
            </p>
            <Link
              href="/letters"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-button border border-border bg-paper-soft px-5 text-sm font-medium text-ink-muted transition active:scale-[0.985]"
            >
              {"\u56de\u5230\u7b14\u53cb\u5217\u8868"}
            </Link>
          </PaperCard>
        )}
      </PageContainer>
    </AppShell>
  );
}

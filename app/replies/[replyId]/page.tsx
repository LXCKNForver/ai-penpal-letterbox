import { notFound } from "next/navigation";
import { ReplyActionBar } from "@/components/replies/ReplyActionBar";
import { ReplyMeta } from "@/components/replies/ReplyMeta";
import { ReplyPaper } from "@/components/replies/ReplyPaper";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { mockReplies } from "@/src/lib/mock/replies";

type ReplyPageProps = {
  params: Promise<{
    replyId: string;
  }>;
};

export default async function ReplyPage({ params }: ReplyPageProps) {
  const { replyId } = await params;
  const reply = mockReplies.find((item) => item.id === replyId);

  if (!reply) {
    notFound();
  }

  return (
    <AppShell>
      <MobileHeader title="回信详情" subtitle="阅读远方寄来的话" backHref="/inbox" action="menu" />
      <PageContainer>
        <div className="space-y-4">
          <ReplyMeta reply={reply} />
          <ReplyPaper reply={reply} />
          <ReplyActionBar />
        </div>
      </PageContainer>
    </AppShell>
  );
}

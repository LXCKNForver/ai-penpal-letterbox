import { redirect } from "next/navigation";

type LegacyReplyPageProps = {
  params: Promise<{
    replyId: string;
  }>;
};

export default async function LegacyReplyPage({ params }: LegacyReplyPageProps) {
  const { replyId } = await params;

  redirect(`/letters/reply/${replyId}`);
}

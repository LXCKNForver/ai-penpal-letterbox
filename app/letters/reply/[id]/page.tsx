import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, MapPinned, PenLine } from "lucide-react";
import { Stamp } from "@/components/decorative/Stamp";
import { WashiTape } from "@/components/decorative/WashiTape";
import { WaxSeal } from "@/components/decorative/WaxSeal";
import { AppShell } from "@/components/layout/AppShell";
import { PaperCard } from "@/components/shared/PaperCard";
import { createClient } from "@/lib/supabase/server";
import { getReplyById, markReplyAsRead } from "@/src/lib/db/replies";
import { getUserPenpals } from "@/src/lib/db/userPenpals";

type ReplyDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatReceivedAt(value: string | null) {
  if (!value) {
    return "刚刚收到";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function splitParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function ReplyDetailPage({ params }: ReplyDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const reply = await getReplyById({ replyId: id, userId: user.id });

  if (!reply) {
    notFound();
  }

  const userPenpals = await getUserPenpals(user.id);
  const penpalDiscovered = userPenpals.some((penpal) => penpal.id === reply.penpalId);
  const penpalName = penpalDiscovered ? reply.penpal.name : "未知远方";

  const wasUnread = !reply.isRead;
  if (wasUnread) {
    try {
      await markReplyAsRead({ replyId: reply.id, userId: user.id });
      revalidatePath("/inbox");
    } catch (error) {
      console.error("Failed to mark reply as read", error);
    }
  }

  return (
    <AppShell>
      <div className="min-h-[calc(100dvh-96px)] px-page pb-8 pt-4">
        <Link
          href="/inbox"
          className="grid size-10 place-items-center rounded-button border border-border bg-paper-soft/80 text-ink"
          aria-label="返回信箱"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="mt-6 space-y-5">
          <PaperCard className="overflow-visible bg-paper-soft/86 p-4 shadow-[0_10px_24px_rgba(89,64,33,0.09)]">
            <WashiTape className="absolute -top-2 left-8 h-4 w-16 opacity-50" tone="blue" />
            <div className="flex items-center gap-3.5">
              <div
                className="grid size-14 shrink-0 place-items-center rounded-[16px] border border-dashed border-ink-muted/30 bg-paper shadow-sm"
                style={{ color: reply.penpal.color }}
              >
                <span className="text-sm font-semibold">{reply.penpal.avatarLabel}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-[0.12em] text-ink-muted/65">
                  FROM FAR AWAY
                </p>
                <h1 className="mt-1 text-xl font-semibold leading-tight text-ink">
                  {`来自 ${penpalName} 的回信`}
                </h1>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] leading-5 text-ink-muted">
                  {penpalDiscovered ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPinned className="size-3" />
                      {reply.penpal.location}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="size-3" />
                    {formatReceivedAt(reply.createdAt)}
                  </span>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-pill border border-border bg-paper px-2 py-1 text-[10px] text-ink-muted">
                <Check className="size-3" />
                {wasUnread ? "刚刚已读" : "已读"}
              </span>
            </div>
          </PaperCard>

          <article className="relative overflow-hidden rounded-paper border border-border/70 bg-[#fffaf0] px-5 pb-7 pt-8 text-ink shadow-[0_18px_42px_rgba(86,62,33,0.13)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.72),transparent_24%),linear-gradient(135deg,rgba(126,96,48,0.07)_0_1px,transparent_1px_13px)]" />
            <WashiTape className="absolute -top-2 right-10 rotate-3 opacity-70" tone="rose" />
            <Stamp className="absolute right-4 top-5 rotate-6" color={reply.penpal.color} label="MAIL" />

            <div className="relative z-10 pr-12">
              <div className="mb-7 inline-flex items-center gap-2 border-b border-border/70 pb-2 text-sm font-semibold text-ink">
                <PenLine className="size-4" />
                {"展开的一封信"}
              </div>
              <div className="space-y-5 whitespace-pre-line text-sm leading-8 text-[#4e412f]">
                {splitParagraphs(reply.content).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <WaxSeal className="absolute bottom-5 right-7" />
          </article>
        </div>
      </div>
    </AppShell>
  );
}

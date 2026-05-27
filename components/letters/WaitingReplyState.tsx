import Link from "next/link";
import { ArrowLeft, Clock3, Inbox, MailOpen, Moon, Waves } from "lucide-react";
import { Stamp } from "@/components/decorative/Stamp";
import { WaxSeal } from "@/components/decorative/WaxSeal";
import { SimulateReplyButton } from "@/components/letters/SimulateReplyButton";
import { getLetterWaitingStage, type LetterWaitingStage } from "@/src/lib/utils/letterStatus";
import type { LetterWithPenpal } from "@/types/letter";

type WaitingReplyStateProps = {
  letter: LetterWithPenpal;
};

function formatExpectedReply(value: string | null) {
  if (!value) {
    return "时间还在路上";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getStageCopy(stage: LetterWaitingStage, penpalName: string) {
  switch (stage) {
    case "drifting":
      return {
        title: "你的信正在穿过夜晚的海面",
        body: "它会慢慢漂到远方，等待一封真诚的回信。",
      };
    case "arrived":
      return {
        title: "你的信已经抵达远方",
        body: `也许 ${penpalName} 正在窗边拆开这封信。`,
      };
    case "writing":
      return {
        title: `${penpalName} 正在慢慢写回信`,
        body: "别着急，有些话需要一点时间。",
      };
    case "replied":
      return {
        title: "远方的回信已经抵达",
        body: `你收到了一封来自 ${penpalName} 的回信。`,
      };
    case "failed":
      return {
        title: "这封信暂时没有寄到",
        body: "也许风向不太好，先回到信箱看看别的信吧。",
      };
  }
}

export function WaitingReplyState({ letter }: WaitingReplyStateProps) {
  const penpal = letter.penpal;
  const expectedReply = formatExpectedReply(letter.scheduledReplyAt);
  const reply = letter.reply ?? null;
  const stage = getLetterWaitingStage(letter, reply);
  const isUnknownPenpal = !letter.penpalDiscovered && stage !== "replied";
  const stageCopy = isUnknownPenpal
    ? {
        title: "你的信正在穿过夜晚的海面",
        body: "它会漂向某个还不知道名字的远方。",
      }
    : getStageCopy(stage, penpal.name);
  const canOpenReply = stage === "replied" && reply;
  const showDevButton =
    process.env.NODE_ENV === "development" && letter.status === "pending" && !reply;

  return (
    <div className="min-h-[calc(100svh-var(--bottom-nav-height)-56px)] px-page pb-[calc(1.5rem+var(--safe-area-bottom))] pt-4 supports-[height:100dvh]:min-h-[calc(100dvh-var(--bottom-nav-height)-56px)]">
      <Link
        href="/inbox"
        className="grid size-11 place-items-center rounded-button border border-border bg-paper-soft/80 text-ink shadow-[0_6px_16px_rgba(86,62,33,0.08)] transition active:scale-[0.97] active:opacity-80"
        aria-label={"\u8fd4\u56de\u4fe1\u7bb1"}
      >
        <ArrowLeft className="size-4" />
      </Link>

      <section className="mt-9 overflow-hidden rounded-paper border border-border/60 bg-olive-soft p-card text-center shadow-floating">
        <div className="relative mx-auto flex min-h-[250px] max-w-[310px] items-center justify-center rounded-paper bg-[linear-gradient(180deg,var(--lake-blue)_0%,#8794a1_52%,#d8d7be_100%)]">
          <Moon
            className="absolute right-10 top-9 size-9 text-moon"
            fill="currentColor"
            strokeWidth={1.5}
          />
          <div className="absolute bottom-9 left-6 right-6 h-20 rounded-[50%] bg-lake-blue/35 blur-[1px]" />
          <Waves className="absolute bottom-12 left-8 size-9 text-paper/70" strokeWidth={1.5} />
          <Waves
            className="absolute bottom-8 right-9 size-11 text-paper-soft/70"
            strokeWidth={1.5}
          />

          <div className="relative grid h-28 w-16 place-items-center rounded-[32px] border border-paper-deep/70 bg-paper/75 shadow-floating animate-float-slow">
            <div className="absolute -top-4 h-8 w-9 rounded-t-[18px] border border-border bg-paper-deep" />
            <div className="h-12 w-10 rounded-md border border-border bg-paper-soft shadow-sm">
              <div className="mx-auto mt-3 h-px w-6 bg-border" />
              <div className="mx-auto mt-2 h-px w-5 bg-border" />
            </div>
            <WaxSeal className="absolute bottom-8 right-2" size="sm" />
          </div>

          <Stamp
            className="absolute left-5 top-6 rotate-[-7deg] scale-75 opacity-70"
            color={penpal.color}
            label="SENT"
          />
        </div>

        <div className="mx-auto mt-8 max-w-[300px]">
          <h1 className="text-2xl font-semibold text-ink">{stageCopy.title}</h1>
          <p className="mt-3 text-sm leading-7 text-ink-muted">
            {stageCopy.body}
          </p>
        </div>

        <div className="mx-auto mt-7 space-y-2 rounded-card border border-border/70 bg-paper-soft/80 px-4 py-3 text-left text-sm leading-6 text-ink-muted">
          {isUnknownPenpal ? (
            <p className="flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              <span>也许等回信抵达，你才会知道是谁读到了它。</span>
            </p>
          ) : (
            <>
              <p className="flex items-center gap-1.5">
                <Clock3 className="size-3.5" />
                <span>预计回信时间：{expectedReply}</span>
              </p>
              <p>当前笔友：{penpal.name}</p>
            </>
          )}
        </div>

        <div className="mt-4 rounded-card border border-border/50 bg-paper/45 px-4 py-3 text-left text-xs leading-6 text-ink-muted">
          <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-ink-muted/55">
            YOUR LETTER
          </p>
          <p className="line-clamp-3">{letter.content}</p>
        </div>

        <div className="mt-8 space-y-3">
          {showDevButton ? <SimulateReplyButton letterId={letter.id} /> : null}
          <Link
            href={canOpenReply ? `/letters/reply/${reply.id}` : "/inbox"}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button"
          >
            {canOpenReply ? <MailOpen className="size-4" /> : <Inbox className="size-4" />}
            {canOpenReply ? "打开回信" : "回到信箱"}
          </Link>
          <Link
            href="/profile"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-button border border-border bg-paper-soft/70 px-5 text-sm font-medium text-ink-muted transition active:scale-[0.985]"
          >
            {"今天先写到这里"}
          </Link>
        </div>
      </section>
    </div>
  );
}

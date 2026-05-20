import Link from "next/link";
import { MailOpen, PenLine } from "lucide-react";
import { PaperCard } from "@/components/shared/PaperCard";

type EmptyInboxProps = {
  tone?: "first-letter" | "inbox" | "sent";
};

const copy = {
  "first-letter": {
    title: "\u4fe1\u7bb1\u8fd8\u5728\u7b49\u7b2c\u4e00\u5c01\u4fe1",
    body: "\u73b0\u5728\u8fd8\u6ca1\u6709\u6765\u4fe1\uff0c\u4e5f\u6ca1\u6709\u5bc4\u51fa\u7684\u4fe1\u3002\u5199\u4e0b\u7b2c\u4e00\u5c01\u6f02\u6d41\u4fe1\uff0c\u8ba9\u5b83\u5e26\u4f60\u9047\u89c1\u8fdc\u65b9\u7684\u4eba\u3002",
    showAction: true,
  },
  inbox: {
    title: "\u6ca1\u6709\u6b63\u5728\u6f02\u6d41\u7684\u4fe1",
    body: "\u4f60\u5bc4\u51fa\u53bb\u3001\u6b63\u5728\u7b49\u56de\u4fe1\u7684\u4fe1\uff0c\u4f1a\u6162\u6162\u6536\u5728\u8fd9\u91cc\u3002",
    showAction: false,
  },
  sent: {
    title: "\u8fd8\u6ca1\u6709\u6536\u5230\u56de\u4fe1",
    body: "\u7b49\u7b14\u53cb\u7684\u56de\u4fe1\u5bc4\u5230\u4fe1\u7bb1\uff0c\u5b83\u4f1a\u50cf\u4e00\u5c01\u65b0\u6765\u4fe1\u4e00\u6837\u51fa\u73b0\u5728\u8fd9\u91cc\u3002",
    showAction: false,
  },
};

export function EmptyInbox({ tone = "inbox" }: EmptyInboxProps) {
  const content = copy[tone];

  return (
    <PaperCard className="py-10 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-paper-deep text-olive-deep">
        <MailOpen className="size-6" />
      </div>
      <h2 className="mt-4 text-base font-semibold text-ink">{content.title}</h2>
      <p className="mx-auto mt-2 max-w-64 text-sm leading-6 text-ink-muted">
        {content.body}
      </p>
      {content.showAction ? (
        <Link
          href="/letters/first"
          className="mx-auto mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-button border border-olive-deep/20 bg-olive px-5 text-sm font-semibold text-paper-soft shadow-button"
        >
          <PenLine className="size-4" />
          {"\u5199\u4e0b\u7b2c\u4e00\u5c01\u4fe1"}
        </Link>
      ) : null}
    </PaperCard>
  );
}

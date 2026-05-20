"use client";

import { cn } from "@/lib/utils";

type InboxTabsProps = {
  value: "inbox" | "sent";
  onChange: (value: "inbox" | "sent") => void;
};

const tabs = [
  { value: "inbox" as const, label: "\u7b49\u5f85\u56de\u4fe1" },
  { value: "sent" as const, label: "\u5df2\u6536\u5230" },
];

export function InboxTabs({ value, onChange }: InboxTabsProps) {
  return (
    <div className="grid grid-cols-2 rounded-[16px] border border-border bg-paper-deep p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cn(
            "rounded-[12px] px-3 py-2 text-sm font-medium text-ink-muted transition",
            value === tab.value && "bg-paper-soft text-ink shadow-sm"
          )}
          type="button"
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

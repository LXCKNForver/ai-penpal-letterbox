"use client";

import { cn } from "@/lib/utils";

type InboxTabsProps = {
  value: "inbox" | "sent";
  onChange: (value: "inbox" | "sent") => void;
};

const tabs = [
  { value: "inbox" as const, label: "收件箱" },
  { value: "sent" as const, label: "已寄出" },
];

export function InboxTabs({ value, onChange }: InboxTabsProps) {
  return (
    <div className="grid grid-cols-2 rounded-[16px] border border-[#d7c39f] bg-[#efe2c6] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cn(
            "rounded-[12px] px-3 py-2 text-sm font-medium text-[#756247] transition",
            value === tab.value && "bg-[#fff8e8] text-[#4d402f] shadow-sm"
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

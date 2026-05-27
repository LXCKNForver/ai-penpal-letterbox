"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/src/i18n/useI18n";

type InboxTabsProps = {
  value: "inbox" | "sent";
  onChange: (value: "inbox" | "sent") => void;
};

const tabs = [
  { value: "inbox" as const, labelKey: "inbox.tabs.waiting" as const },
  { value: "sent" as const, labelKey: "inbox.tabs.received" as const },
];

export function InboxTabs({ value, onChange }: InboxTabsProps) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-2 rounded-[16px] border border-border bg-paper-deep p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cn(
            "relative rounded-[12px] px-3 py-2 text-sm font-medium text-ink-muted transition-colors duration-300",
            value === tab.value && "text-ink"
          )}
          type="button"
          onClick={() => onChange(tab.value)}
        >
          {value === tab.value ? (
            <motion.span
              className="absolute inset-0 rounded-[12px] bg-paper-soft shadow-sm"
              layoutId="inbox-tab-indicator"
              transition={{ duration: 0.32, ease: "easeOut" }}
            />
          ) : null}
          <span className="relative z-10">{t(tab.labelKey)}</span>
        </button>
      ))}
    </div>
  );
}

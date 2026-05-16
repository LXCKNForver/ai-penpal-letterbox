"use client";

import { useState } from "react";
import { Bookmark, Check, Feather } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { label: "回信", icon: Feather },
  { label: "收藏", icon: Bookmark },
  { label: "已读", icon: Check },
];

export function ReplyActionBar() {
  const [active, setActive] = useState("已读");

  return (
    <div className="grid grid-cols-3 gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        const selected = active === action.label;

        return (
          <button
            key={action.label}
            className={cn(
              "flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-[#d8c6a5] bg-[#fff8e8] text-xs font-medium text-[#69583e]",
              selected && "border-[#87985f] bg-[#e6edcf] text-[#5f713b]"
            )}
            type="button"
            onClick={() => setActive(action.label)}
          >
            <Icon className="size-3.5" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

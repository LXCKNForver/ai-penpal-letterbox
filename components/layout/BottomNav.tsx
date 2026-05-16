"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNavItems } from "@/src/lib/mock/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] px-5 pb-4">
      <div className="grid grid-cols-5 items-end rounded-[20px] border border-border/70 bg-paper-soft/88 px-2 py-2 shadow-[0_8px_22px_rgba(88,63,31,0.12)]">
        {bottomNavItems.map((item) => {
          if (item.type === "center") {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="-mt-7 flex flex-col items-center justify-end"
                aria-hidden="true"
              >
                <span className="grid size-14 place-items-center rounded-full border border-border/80 bg-olive text-paper-soft shadow-[0_7px_15px_rgba(80,75,38,0.18)]">
                  <Icon className="size-8 rotate-[18deg]" strokeWidth={1.8} />
                </span>
                <span className="mt-1 h-[13px]" />
              </div>
            );
          }

          const isActive =
            pathname === item.href ||
            (item.href !== "/inbox" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-col items-center gap-1 rounded-card px-1 py-1.5 text-[11px] font-medium text-ink-muted",
                isActive && "text-olive-deep"
              )}
            >
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-full border border-transparent",
                  isActive && "bg-olive-soft/80 shadow-sm"
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { bottomNavItems } from "@/src/lib/mock/navigation";
import { softSpring } from "@/src/lib/motion";
import { useI18n } from "@/src/i18n/useI18n";
import { cn } from "@/lib/utils";

const navLabelKeys: Record<string, "nav.inbox" | "nav.discover" | "nav.write" | "nav.profile"> = {
  "/discover": "nav.discover",
  "/inbox": "nav.inbox",
  "/letters": "nav.write",
  "/profile": "nav.profile",
};

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] px-4 pb-[calc(0.75rem+var(--safe-area-bottom))]">
      <div className="grid grid-cols-5 items-end rounded-[24px] border border-paper-soft/80 bg-paper-soft/78 px-2 py-2 shadow-[0_16px_40px_rgba(88,63,31,0.18)] backdrop-blur-xl">
        {bottomNavItems.map((item) => {
          if (item.type === "center") {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="-mt-7 flex flex-col items-center justify-end"
                aria-hidden="true"
              >
                <span className="grid size-[3.75rem] place-items-center rounded-full border border-[#d8c49f]/90 bg-olive text-paper-soft shadow-[0_12px_28px_rgba(80,75,38,0.24),inset_0_1px_0_rgba(255,255,255,0.22)]">
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
              prefetch
              className={cn(
                "flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-card px-1 py-1.5 text-[11px] font-medium text-ink-muted transition active:scale-[0.97] active:opacity-80",
                isActive && "text-olive-deep"
              )}
            >
              <span
                className={cn(
                  "relative grid size-8 place-items-center rounded-full border border-transparent",
                  isActive && "text-olive-deep"
                )}
              >
                {isActive ? (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-olive-soft/85 shadow-[0_0_18px_rgba(117,136,78,0.22)]"
                    layoutId="bottom-nav-active"
                    transition={softSpring}
                  />
                ) : null}
                <motion.span
                  animate={
                    isActive
                      ? {
                          scale: 1,
                          y: 0,
                        }
                      : { scale: 1, y: 0 }
                  }
                  className="relative z-10 inline-flex"
                  transition={softSpring}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon className="size-4" />
                </motion.span>
              </span>
                <span className="leading-none">{t(navLabelKeys[item.href])}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

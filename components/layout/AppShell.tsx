import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobilePageTransition } from "@/components/layout/MobilePageTransition";
import { PaperTexture } from "@/components/decorative/PaperTexture";

type AppShellProps = {
  children: ReactNode;
  showNav?: boolean;
  transition?: boolean;
};

export function AppShell({
  children,
  showNav = true,
  transition = true,
}: AppShellProps) {
  const content = transition ? (
    <MobilePageTransition>{children}</MobilePageTransition>
  ) : (
    children
  );

  return (
    <div className="h-svh overflow-hidden bg-paper-deep text-ink supports-[height:100dvh]:h-dvh">
      <div className="relative mx-auto h-svh w-full max-w-[430px] overflow-hidden border-x border-border/50 bg-paper shadow-floating supports-[height:100dvh]:h-dvh">
        <PaperTexture />
        <div className="relative z-10 flex h-svh flex-col supports-[height:100dvh]:h-dvh">
          <div
            data-app-scroll
            className={
              showNav
                ? "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain pb-[calc(var(--bottom-nav-height)+var(--safe-area-bottom)+12px)] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
                : "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain pb-[calc(20px+var(--safe-area-bottom))] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
            }
          >
            {content}
          </div>
          {showNav ? <BottomNav /> : null}
        </div>
      </div>
    </div>
  );
}

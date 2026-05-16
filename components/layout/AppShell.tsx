import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PaperTexture } from "@/components/decorative/PaperTexture";

type AppShellProps = {
  children: ReactNode;
  showNav?: boolean;
};

export function AppShell({ children, showNav = true }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-paper-deep text-ink">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-hidden border-x border-border/50 bg-paper shadow-floating">
        <PaperTexture />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <div className="flex-1 pb-24">{children}</div>
          {showNav ? <BottomNav /> : null}
        </div>
      </div>
    </div>
  );
}

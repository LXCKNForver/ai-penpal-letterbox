import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("px-page pb-[calc(1.5rem+var(--safe-area-bottom))] pt-2", className)}>
      {children}
    </main>
  );
}

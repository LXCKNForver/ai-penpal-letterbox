"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { TabPageCache } from "@/components/layout/TabPageCache";

type AppRouteShellProps = {
  children: ReactNode;
};

const tabRoutes = new Set(["/inbox", "/discover", "/letters", "/profile"]);

export function AppRouteShell({ children }: AppRouteShellProps) {
  const pathname = usePathname();

  if (!tabRoutes.has(pathname)) {
    return children;
  }

  return (
    <AppShell transition={false}>
      <TabPageCache activeKey={pathname}>{children}</TabPageCache>
    </AppShell>
  );
}

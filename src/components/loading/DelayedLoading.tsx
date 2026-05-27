"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type DelayedLoadingProps = {
  children: ReactNode;
  delay?: number;
};

export function DelayedLoading({ children, delay = 300 }: DelayedLoadingProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShouldShow(true), delay);

    return () => window.clearTimeout(timeout);
  }, [delay]);

  if (!shouldShow) {
    return null;
  }

  return children;
}

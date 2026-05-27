"use client";

import { useCallback, type FocusEvent } from "react";

export function useFocusScrollIntoView<TElement extends HTMLElement>() {
  return useCallback((event: FocusEvent<TElement>) => {
    if (typeof window === "undefined") return;

    const target = event.currentTarget;

    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 80);
  }, []);
}

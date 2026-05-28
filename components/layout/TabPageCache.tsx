"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { motion } from "framer-motion";

type CachedTabPage = {
  children: ReactNode;
  key: string;
};

type TabPageCacheProps = {
  activeKey: string;
  children: ReactNode;
};

type CacheAction = {
  children: ReactNode;
  key: string;
};

const transition = {
  duration: 0.26,
  ease: [0.22, 1, 0.36, 1],
} as const;

function cacheReducer(pages: CachedTabPage[], action: CacheAction) {
  const existingIndex = pages.findIndex((page) => page.key === action.key);

  if (existingIndex === -1) {
    return [...pages, action];
  }

  return pages.map((page, index) =>
    index === existingIndex ? action : page
  );
}

export function TabPageCache({ activeKey, children }: TabPageCacheProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const scrollPositionsRef = useRef(new Map<string, number>());
  const [pages, dispatch] = useReducer(cacheReducer, [
    { children, key: activeKey },
  ]);

  useEffect(() => {
    const scrollContainer = hostRef.current?.closest<HTMLElement>("[data-app-scroll]");
    const scrollPositions = scrollPositionsRef.current;

    window.requestAnimationFrame(() => {
      if (!scrollContainer) {
        return;
      }

      scrollContainer.scrollTop = scrollPositions.get(activeKey) ?? 0;
    });

    return () => {
      if (scrollContainer) {
        scrollPositions.set(activeKey, scrollContainer.scrollTop);
      }
    };
  }, [activeKey]);

  useEffect(() => {
    dispatch({ children, key: activeKey });
  }, [activeKey, children]);

  const renderedPages = useMemo(() => {
    const hasActivePage = pages.some((page) => page.key === activeKey);

    if (hasActivePage) {
      return pages.map((page) =>
        page.key === activeKey ? { children, key: activeKey } : page
      );
    }

    return [...pages, { children, key: activeKey }];
  }, [activeKey, children, pages]);

  return (
    <div className="min-h-full" ref={hostRef}>
      {renderedPages.map((page) => {
        const isActive = page.key === activeKey;

        return (
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 8,
            }}
            className={isActive ? "min-h-full" : "hidden"}
            initial={false}
            key={page.key}
            transition={transition}
          >
            {page.children}
          </motion.div>
        );
      })}
    </div>
  );
}

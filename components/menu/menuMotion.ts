import { motionEaseOut } from "@/src/lib/motion";

export const sideMenuOverlayMotion = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  transition: { duration: 0.28, ease: motionEaseOut },
} as const;

export const sideMenuDrawerMotion = {
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 48 },
  initial: { opacity: 0, x: 40 },
  transition: { duration: 0.45, ease: motionEaseOut },
} as const;

export const sideMenuListMotion = {
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.055,
    },
  },
  initial: { opacity: 0 },
} as const;

export const sideMenuItemMotion = {
  animate: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.42, ease: motionEaseOut },
    y: 0,
  },
  initial: { filter: "blur(4px)", opacity: 0, y: 10 },
} as const;

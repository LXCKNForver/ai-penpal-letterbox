export const motionEaseOut = [0.22, 1, 0.36, 1] as const;

export const softSpring = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.9,
} as const;

export const gentleTap = {
  scale: 0.985,
} as const;

export const pageFadeSlide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
  transition: { duration: 0.26, ease: motionEaseOut },
} as const;

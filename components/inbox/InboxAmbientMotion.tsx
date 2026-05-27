"use client";

import { motion } from "framer-motion";

const particles = [
  { delay: 0.4, left: "12%", top: "18%", size: "h-1 w-1" },
  { delay: 1.8, left: "28%", top: "9%", size: "h-1.5 w-1.5" },
  { delay: 1.1, left: "63%", top: "16%", size: "h-1 w-1" },
  { delay: 2.4, left: "82%", top: "24%", size: "h-1.5 w-1.5" },
];

export function InboxAmbientMotion() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div
        animate={{
          opacity: [0.16, 0.28, 0.16],
          scale: [0.98, 1.03, 0.98],
        }}
        className="absolute -left-16 top-12 h-44 w-44 rounded-full bg-moon/24 blur-3xl"
        transition={{ duration: 6.8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          x: [-4, 6, -4],
        }}
        className="absolute right-[-72px] top-28 h-52 w-52 rounded-full bg-olive-soft/28 blur-3xl"
        transition={{ duration: 7.4, ease: "easeInOut", repeat: Infinity }}
      />
      {particles.map((particle) => (
        <motion.span
          animate={{
            opacity: [0.08, 0.2, 0.08],
            y: [0, -4, 0],
          }}
          className={`absolute rounded-full bg-paper-soft shadow-[0_0_10px_rgba(255,248,232,0.28)] ${particle.size}`}
          key={`${particle.left}-${particle.top}`}
          style={{ left: particle.left, top: particle.top }}
          transition={{
            delay: particle.delay,
            duration: 5.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

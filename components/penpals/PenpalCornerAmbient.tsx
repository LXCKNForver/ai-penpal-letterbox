"use client";

import { motion } from "framer-motion";

const dust = [
  { delay: 0.2, left: "10%", top: "12%" },
  { delay: 1.1, left: "24%", top: "34%" },
  { delay: 0.7, left: "68%", top: "18%" },
  { delay: 1.8, left: "84%", top: "42%" },
  { delay: 2.4, left: "48%", top: "64%" },
];

export function PenpalCornerAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ opacity: [0.14, 0.28, 0.14], scale: [0.96, 1.04, 0.96] }}
        className="absolute -right-20 top-2 h-48 w-48 rounded-full bg-moon/35 blur-3xl"
        transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08], x: [-10, 8, -10] }}
        className="absolute left-[-35%] top-72 h-36 w-[150%] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,248,232,0.36),rgba(214,195,156,0.14),transparent)] blur-3xl"
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
      />
      {dust.map((particle) => (
        <motion.span
          animate={{ opacity: [0.04, 0.14, 0.04], y: [0, -6, 0] }}
          className="absolute size-1 rounded-full bg-[#fff8e8] shadow-[0_0_12px_rgba(255,248,232,0.24)]"
          key={`${particle.left}-${particle.top}`}
          style={{ left: particle.left, top: particle.top }}
          transition={{
            delay: particle.delay,
            duration: 6.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

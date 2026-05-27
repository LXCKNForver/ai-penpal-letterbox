"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const onboardingStorageKey = "hasSeenOnboarding";

type OnboardingSlide = {
  artClassName: string;
  artSrc: string;
  backgroundSrc: string;
  id: number;
  subtitle: string;
  title: string;
};

const slides: OnboardingSlide[] = [
  {
    id: 0,
    title: "把想说的话，慢慢写下来",
    subtitle: "总会有人，在世界另一端认真读完你的心事。",
    backgroundSrc: "/assets/onboarding/onboardingbg1.png",
    artSrc: "/assets/onboarding/onboarding1pic.png",
    artClassName: "h-[290px] w-[326px]",
  },
  {
    id: 1,
    title: "回信不会立刻到达",
    subtitle: "但等待本身，也是漂流的一部分。",
    backgroundSrc: "/assets/onboarding/onboardingbg2.png",
    artSrc: "/assets/onboarding/onboarding2pic.png",
    artClassName: "h-[302px] w-[318px]",
  },
  {
    id: 2,
    title: "总会有人，温柔回应你的漂流",
    subtitle: "现在开始你的第一封信吧。",
    backgroundSrc: "/assets/onboarding/onboardingbg3.png",
    artSrc: "/assets/onboarding/onboarding3pic.png",
    artClassName: "h-[352px] w-[306px]",
  },
];

const slideVariants = {
  center: {
    opacity: 1,
    x: 0,
  },
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -18 : 18,
  }),
};

const copyVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.08,
    },
    y: 0,
  },
};

const copyItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.48,
      ease: "easeOut",
    },
    y: 0,
  },
};

const starParticles = [
  { delay: 0.2, duration: 4.7, left: "9%", size: "h-1 w-1", top: "11%" },
  { delay: 1.1, duration: 5.4, left: "18%", size: "h-1.5 w-1.5", top: "24%" },
  { delay: 0.7, duration: 5, left: "31%", size: "h-1 w-1", top: "16%" },
  { delay: 1.8, duration: 5.9, left: "43%", size: "h-1 w-1", top: "9%" },
  { delay: 0.5, duration: 5.6, left: "58%", size: "h-1.5 w-1.5", top: "21%" },
  { delay: 1.3, duration: 4.9, left: "72%", size: "h-1 w-1", top: "13%" },
  { delay: 0.9, duration: 5.8, left: "84%", size: "h-1 w-1", top: "27%" },
  { delay: 2.1, duration: 6.2, left: "91%", size: "h-1.5 w-1.5", top: "18%" },
];

function saveOnboardingSeen() {
  try {
    window.localStorage.setItem(onboardingStorageKey, "true");
  } catch {
    // Continue into auth even when storage is unavailable.
  }
}

export function OnboardingExperience() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const slide = slides[index];
  const isLastSlide = index === slides.length - 1;
  const artAnimate =
    index === 1
      ? {
          rotate: [-1.7, 1.5, -1.7],
          y: [0, -7, 0],
        }
      : {
          y: [0, -6, 0],
        };

  function finishOnboarding() {
    saveOnboardingSeen();
    router.replace("/auth/register");
  }

  function showSlide(nextIndex: number) {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  }

  function continueOnboarding() {
    if (isLastSlide) {
      finishOnboarding();
      return;
    }

    showSlide(index + 1);
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#071426] text-[#fff8e8] supports-[height:100dvh]:min-h-dvh">
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.section
          animate="center"
          className="absolute inset-0 min-h-svh overflow-hidden supports-[height:100dvh]:min-h-dvh"
          custom={direction}
          exit="exit"
          initial="enter"
          key={slide.id}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          variants={slideVariants}
        >
          <motion.div
            animate={{
              scale: [1.035, 1.06, 1.035],
              x: [0, direction > 0 ? -8 : 8, 0],
            }}
            className="absolute inset-[-3%]"
            initial={{
              opacity: 0.72,
              scale: 1.075,
              x: direction > 0 ? 24 : -24,
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <Image
              alt=""
              className="object-cover object-center"
              fill
              priority
              sizes="430px"
              src={slide.backgroundSrc}
            />
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,22,0.72)_0%,rgba(4,15,34,0.28)_35%,rgba(6,21,39,0.1)_52%,rgba(6,17,34,0.74)_100%)]" />
          <div className="absolute inset-x-[-18%] bottom-[-8%] h-[48%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,220,157,0.36)_0%,rgba(248,196,127,0.12)_34%,rgba(6,17,34,0)_72%)]" />
          <motion.div
            animate={{
              opacity: [0.34, 0.52, 0.34],
              scale: [0.96, 1.05, 0.96],
            }}
            className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,240,196,0.42)_0%,rgba(255,240,196,0.12)_38%,rgba(255,240,196,0)_72%)] blur-xl"
            transition={{
              duration: 7.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          <div aria-hidden="true" className="absolute inset-0">
            {starParticles.map((particle) => (
              <motion.span
                animate={{
                  opacity: [0.18, 0.96, 0.18],
                  scale: [0.7, 1.25, 0.7],
                }}
                className={`absolute rounded-full bg-[#fff4cd] shadow-[0_0_14px_rgba(255,239,190,0.72)] ${particle.size}`}
                key={`${particle.left}-${particle.top}`}
                style={{ left: particle.left, top: particle.top }}
                transition={{
                  delay: particle.delay,
                  duration: particle.duration,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          <motion.div
            animate={{
              opacity: [0.24, 0.42, 0.24],
              x: [-10, 10, -10],
            }}
            aria-hidden="true"
            className="absolute inset-x-[-18%] bottom-[31%] h-28 rounded-full bg-[linear-gradient(90deg,rgba(182,213,226,0)_0%,rgba(213,231,232,0.24)_36%,rgba(246,229,185,0.18)_62%,rgba(182,213,226,0)_100%)] blur-3xl"
            transition={{
              duration: 9,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          <button
            className="absolute right-5 top-[max(1.5rem,env(safe-area-inset-top))] z-40 rounded-full border border-[#fff8e8]/20 bg-[#071426]/22 px-4 py-2 text-sm font-semibold text-[#fff8e8]/90 shadow-[0_10px_30px_rgba(2,8,17,0.16)] backdrop-blur-md transition hover:bg-[#071426]/36 hover:text-[#fff8e8]"
            onClick={finishOnboarding}
            type="button"
          >
            Skip
          </button>

          <motion.div
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="absolute inset-x-0 bottom-[33%] z-20 flex justify-center px-4"
            exit={{
              opacity: 0,
              x: direction > 0 ? -34 : 34,
            }}
            initial={{
              opacity: 0,
              x: direction > 0 ? 34 : -34,
            }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={artAnimate}
              className="relative flex max-w-full justify-center"
              transition={{
                duration: index === 1 ? 7.2 : index === 2 ? 6.5 : 7,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <motion.div
                animate={{
                  opacity: [0.2, 0.38, 0.2],
                  scaleX: [0.92, 1.08, 0.92],
                }}
                aria-hidden="true"
                className="absolute inset-x-[8%] bottom-2 h-16 rounded-[50%] bg-[radial-gradient(ellipse,rgba(190,224,239,0.36)_0%,rgba(131,182,211,0.14)_42%,rgba(131,182,211,0)_76%)] blur-2xl"
                transition={{
                  duration: 7.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              <div
                className={`relative max-w-full bg-transparent ${slide.artClassName}`}
              >
                {index === 2 ? (
                  <motion.div
                    animate={{
                      opacity: [0.24, 0.5, 0.24],
                      scale: [0.94, 1.05, 0.94],
                    }}
                    className="absolute inset-[8%] rounded-full bg-[#f7e9b9]/34 blur-3xl"
                    transition={{
                      duration: 4.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                ) : null}
                {index === 1 ? (
                  <>
                    <motion.div
                      animate={{
                        opacity: [0.08, 0.34, 0.08],
                        scale: [0.84, 1.08, 0.84],
                      }}
                      aria-hidden="true"
                      className="absolute inset-x-[5%] bottom-[11%] h-16 rounded-[50%] border border-[#dff4ff]/28"
                      transition={{
                        duration: 6.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    />
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.08, 0.2],
                        scaleX: [0.88, 1.04, 0.88],
                      }}
                      aria-hidden="true"
                      className="absolute inset-x-[11%] bottom-[9%] h-9 rounded-[50%] bg-[#bbdeee]/18 blur-md"
                      transition={{
                        duration: 7.4,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    />
                  </>
                ) : null}
                <div className="absolute inset-[10%] rounded-full bg-[#cbe6f6]/12 blur-3xl" />
                <Image
                  alt=""
                  className="bg-transparent object-contain drop-shadow-[0_24px_38px_rgba(2,8,18,0.42)] drop-shadow-[0_0_22px_rgba(202,231,249,0.18)]"
                  fill
                  priority
                  sizes="(max-width: 430px) calc(100vw - 32px), 326px"
                  src={slide.artSrc}
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-30 h-[40%] bg-[linear-gradient(180deg,rgba(3,13,28,0)_0%,rgba(7,18,34,0.28)_22%,rgba(6,14,29,0.76)_62%,rgba(5,12,25,0.96)_100%)] backdrop-blur-[2px]" />
          <div className="absolute inset-x-[-15%] bottom-[18%] z-30 h-16 bg-[radial-gradient(ellipse,rgba(235,246,248,0.16)_0%,rgba(174,210,226,0.08)_42%,rgba(174,210,226,0)_76%)] blur-2xl" />

          <motion.div
            animate="visible"
            className="absolute inset-x-0 bottom-0 z-40 px-6 pb-[calc(env(safe-area-inset-bottom)+1.75rem)] pt-24 text-center"
            initial="hidden"
            variants={copyVariants}
          >
            <motion.h1
              className="mx-auto max-w-[336px] text-[26px] font-semibold leading-[2.35rem] text-[#fff3dc] drop-shadow-[0_3px_18px_rgba(1,7,18,0.54)]"
              variants={copyItemVariants}
            >
              {slide.title}
            </motion.h1>
            <motion.p
              className="mx-auto mt-3 min-h-12 max-w-[300px] text-sm leading-6 text-[#f6ead0]/76 drop-shadow-[0_2px_12px_rgba(1,7,18,0.48)]"
              variants={copyItemVariants}
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              aria-label="Onboarding pages"
              className="mt-5 flex items-center justify-center gap-3"
              variants={copyItemVariants}
            >
              {slides.map((item) => (
                <button
                  aria-label={`Go to page ${item.id + 1}`}
                  className={`relative rounded-full transition-all ${
                    item.id === index
                      ? "h-3.5 w-3.5 bg-[#fff0c7] shadow-[0_0_0_4px_rgba(247,233,185,0.1),0_0_22px_rgba(255,236,184,0.72)]"
                      : "h-2.5 w-2.5 bg-[#e6d6ad]/48 shadow-[0_0_10px_rgba(255,236,184,0.14)] hover:bg-[#f0dfb8]/70"
                  }`}
                  key={item.id}
                  onClick={() => showSlide(item.id)}
                  type="button"
                />
              ))}
            </motion.div>

            <motion.button
              className="relative mt-7 inline-flex min-h-14 w-full items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#0c416d_0%,#155f92_54%,#2477a9_100%)] px-5 text-[15px] font-semibold text-[#fff8e8] shadow-[0_16px_42px_rgba(5,42,72,0.32),0_0_24px_rgba(165,215,242,0.14),inset_0_1px_0_rgba(255,255,255,0.34)] transition hover:-translate-y-0.5 hover:brightness-110"
              onClick={continueOnboarding}
              type="button"
              variants={copyItemVariants}
              whileTap={{ scale: 0.985 }}
            >
              <span className="absolute inset-x-8 top-0 h-px bg-[#fff7dd]/70 blur-[0.5px]" />
              <span className="relative">
                {isLastSlide ? "开始第一封信" : "继续漂流"}
              </span>
            </motion.button>
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </main>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type AuthLetterCardProps = {
  mode: "login" | "register";
};

const copy = {
  login: {
    title: "欢迎回到慢慢信箱",
    subtitle: "远方的回信，正在等你拆开。",
    button: "进入信箱",
    footerText: "还没有信箱？",
    footerLink: "创建一个",
    footerHref: "/auth/register",
  },
  register: {
    title: "创建你的第一只信箱",
    subtitle: "从今天开始，把心事慢慢寄给远方。",
    button: "创建信箱",
    footerText: "已经有信箱了？",
    footerLink: "去登录",
    footerHref: "/auth/login",
  },
};

const fieldClassName =
  "h-12 rounded-[18px] border-[#c7d0d2]/70 bg-[#eef3f1]/72 px-4 text-[15px] text-[#26384a] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] placeholder:text-[#6d7881]/48 focus-visible:border-[#1d6fa5] focus-visible:ring-[#1d6fa5]/18";

const labelClassName = "text-xs font-semibold tracking-[0.02em] text-[#665a49]";

function FloatingBottle() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-46px] left-1/2 z-10 h-[258px] w-[224px] bg-transparent sm:h-[286px] sm:w-[248px]"
      style={{ transform: "translateX(-50%)" }}
    >
      <motion.div
        animate={{
          rotate: [-1.2, 1.4, -1.2],
          y: [0, -6, 0],
        }}
        className="flex h-full w-full items-center justify-center bg-transparent"
        transition={{
          duration: 7.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Image
          alt="漂流瓶"
          className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(181,218,245,0.34)] -mt-25"
          height={935}
          priority
          sizes="(max-width: 430px) 224px, 248px"
          src="/assets/auth/bottle1.png"
          width={808}
        />
      </motion.div>
    </div>
  );
}

export function AuthLetterCard({ mode }: AuthLetterCardProps) {
  const router = useRouter();
  const content = copy[mode];
  const isRegister = mode === "register";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nickname = String(formData.get("nickname") ?? "").trim();
    const supabase = createClient();

    if (isRegister && !nickname) {
      setError("请给你的信箱取一个温柔的名字。");
      setIsLoading(false);
      return;
    }

    const authResult = isRegister
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname,
            },
          },
        })
      : await supabase.auth.signInWithPassword({
          email,
          password,
        });

    if (authResult.error) {
      setError(authResult.error.message);
      setIsLoading(false);
      return;
    }

    if (isRegister) {
      const userId = authResult.data.user?.id;

      if (!userId) {
        setError("注册成功前还需要确认邮箱，请先打开邮箱里的确认信。");
        setIsLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        nickname,
        avatar_url: null,
      });

      if (profileError) {
        setError(profileError.message);
        setIsLoading(false);
        return;
      }
    }

    router.replace("/inbox");
    router.refresh();
  }

  return (
    <motion.main
      animate={{ opacity: 1 }}
      className="relative min-h-dvh overflow-hidden bg-[#071426] text-[#fff8e8]"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        animate={{ scale: 1 }}
        className="absolute inset-0"
        initial={{ scale: 1.045 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <Image
          alt="夜晚海面"
          className="object-cover object-[center_top]"
          fill
          priority
          sizes="430px"
          src="/assets/auth/loginbg.png"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,24,0.56)_0%,rgba(7,20,38,0.44)_34%,rgba(9,24,43,0.68)_64%,rgba(248,239,217,0.24)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,rgba(7,20,38,0)_0%,rgba(248,239,217,0.72)_72%,#f8efd9_100%)]" />

      <section className="relative flex h-[62dvh] min-h-[500px] flex-col items-center px-6 pb-28 pt-8 text-center">

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          transition={{ delay: 0.12, duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border border-[#fff8e8]/32 bg-[#fff8e8]/18 shadow-[0_16px_38px_rgba(0,0,0,0.26)] backdrop-blur-sm">
            <Image
              alt="慢慢信箱"
              className="h-full w-full object-contain p-1"
              height={72}
              priority
              sizes="72px"
              src="/assets/auth/logo.png"
              width={72}
            />
          </div>

          <h1 className="mt-6 text-[28px] font-semibold leading-9 text-[#fff8e8] drop-shadow-[0_2px_14px_rgba(0,0,0,0.34)]">
            {content.title}
          </h1>
          <p className="mt-2 max-w-72 text-sm leading-6 text-[#f6e7c6]/90">
            {content.subtitle}
          </p>
        </motion.div>

        <FloatingBottle />
      </section>

      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="relative z-30 -mt-12 rounded-t-[36px] bg-[#f8efd9] px-6 pb-9 pt-8 text-[#3f3428] shadow-[0_-20px_54px_rgba(5,13,27,0.28)]"
        initial={{ opacity: 0, y: 34 }}
        transition={{ delay: 0.24, duration: 0.84, ease: "easeOut" }}
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[#d6c39c]/80" />

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister ? (
            <label className="block space-y-2">
              <span className={labelClassName}>昵称</span>
              <Input
                className={fieldClassName}
                disabled={isLoading}
                name="nickname"
                placeholder="比如：小笔友"
                required
                type="text"
              />
            </label>
          ) : null}

          <label className="block space-y-2">
            <span className={labelClassName}>邮箱</span>
            <Input
              className={fieldClassName}
              disabled={isLoading}
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>

          <label className="block space-y-2">
            <span className={labelClassName}>密码</span>
            <Input
              className={fieldClassName}
              disabled={isLoading}
              minLength={6}
              name="password"
              placeholder="输入你的密码"
              required
              type="password"
            />
          </label>

          {error ? (
            <p className="rounded-[18px] border border-[#b45c4f]/25 bg-[#b45c4f]/10 px-4 py-3 text-xs leading-5 text-[#3f3428]">
              {error}
            </p>
          ) : null}

          <motion.button
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#0F4C81_0%,#1D6FA5_100%)] px-5 text-sm font-semibold text-[#fff8e8] shadow-[0_14px_30px_rgba(15,76,129,0.28),inset_0_1px_0_rgba(255,255,255,0.24)] transition disabled:cursor-not-allowed disabled:opacity-55"
            disabled={isLoading}
            type="submit"
            whileTap={isLoading ? undefined : { scale: 0.985 }}
          >
            {isLoading ? "正在整理信箱..." : content.button}
          </motion.button>
        </form>

        <p className="mt-7 text-center text-sm text-[#7c6b51]">
          {content.footerText}{" "}
          <Link className="font-semibold text-[#0F4C81]" href={content.footerHref}>
            {content.footerLink}
          </Link>
        </p>
      </motion.section>
    </motion.main>
  );
}

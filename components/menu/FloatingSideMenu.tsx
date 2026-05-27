"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Check,
  Globe2,
  LogOut,
  Moon,
  Palette,
  ScrollText,
  Settings,
  Volume2,
  Waves,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  sideMenuDrawerMotion,
  sideMenuItemMotion,
  sideMenuListMotion,
  sideMenuOverlayMotion,
} from "@/components/menu/menuMotion";
import { getLanguageLabel, locales, type I18nKey, type Locale } from "@/src/i18n/config";
import { useI18n } from "@/src/i18n/useI18n";

type FloatingSideMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ProfileState = {
  avatarUrl: string | null;
  nickname: string | null;
};

type MenuItemData = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  titleKey: I18nKey;
  subtitleKey: I18nKey;
  action?: "language";
};

const menuGroups: Array<{ labelKey: I18nKey; items: MenuItemData[] }> = [
  {
    labelKey: "sideMenu.groupTools",
    items: [
      { titleKey: "sideMenu.sea.title", subtitleKey: "sideMenu.sea.subtitle", icon: Waves },
      { titleKey: "sideMenu.sound.title", subtitleKey: "sideMenu.sound.subtitle", icon: Volume2 },
      {
        titleKey: "sideMenu.records.title",
        subtitleKey: "sideMenu.records.subtitle",
        icon: ScrollText,
      },
    ],
  },
  {
    labelKey: "sideMenu.groupSettings",
    items: [
      {
        titleKey: "language.title",
        subtitleKey: "language.subtitle",
        icon: Globe2,
        action: "language",
      },
      { titleKey: "sideMenu.theme.title", subtitleKey: "sideMenu.theme.subtitle", icon: Palette },
      {
        titleKey: "sideMenu.settings.title",
        subtitleKey: "sideMenu.settings.subtitle",
        icon: Settings,
      },
    ],
  },
];

const lowPriorityItems: MenuItemData[] = [
  { titleKey: "sideMenu.about.title", subtitleKey: "sideMenu.about.subtitle", icon: Box },
  { titleKey: "sideMenu.signOut.title", subtitleKey: "sideMenu.signOut.subtitle", icon: LogOut },
];

const dust = [
  { delay: 0.2, left: "16%", top: "18%" },
  { delay: 1.4, left: "78%", top: "14%" },
  { delay: 0.8, left: "64%", top: "48%" },
  { delay: 2.1, left: "26%", top: "72%" },
];

function MenuItem({
  muted,
  onClick,
  subtitle,
  title,
  icon: Icon,
}: {
  muted?: boolean;
  onClick: () => void;
  subtitle: string;
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <motion.button
      className={cn(
        "group relative flex min-h-[64px] w-full items-center gap-3 rounded-[20px] border px-3.5 py-3 text-left transition",
        muted
          ? "border-border/36 bg-paper-soft/34 text-ink-muted"
          : "border-border/54 bg-paper-soft/56 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
      )}
      onClick={onClick}
      type="button"
      variants={sideMenuItemMotion}
      whileHover={{
        backgroundColor: muted ? "rgba(255, 248, 232, 0.5)" : "rgba(255, 248, 232, 0.72)",
        y: -1,
      }}
      whileTap={{ scale: 0.985, y: 1 }}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-[15px] border",
          muted
            ? "border-border/42 bg-paper-deep/42 text-ink-muted"
            : "border-olive-deep/12 bg-olive-soft/58 text-olive-deep"
        )}
      >
        <Icon className="size-4" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block text-sm font-semibold", muted && "font-medium")}>
          {title}
        </span>
        <span className="mt-0.5 block truncate text-xs leading-5 text-ink-muted/78">
          {subtitle}
        </span>
      </span>
      <span className="absolute inset-0 rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.38),transparent_56%)] opacity-0 transition group-hover:opacity-100" />
    </motion.button>
  );
}

export function FloatingSideMenu({ open, onOpenChange }: FloatingSideMenuProps) {
  const { locale, setLocale, t, tArray } = useI18n();
  const [profile, setProfile] = useState<ProfileState>({
    avatarUrl: null,
    nickname: null,
  });
  const [languageOpen, setLanguageOpen] = useState(false);
  const statuses = tArray("sideMenu.statuses");
  const status = statuses[(new Date().getDate() + new Date().getHours()) % statuses.length] ?? "";
  const initials = profile.nickname?.trim().slice(0, 2) || t("sideMenu.initials");
  const close = useMemo(() => () => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    const supabase = createClient();

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || cancelled) return;

      const { data } = await supabase
        .from("profiles")
        .select("nickname, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (cancelled) return;

      setProfile({
        avatarUrl: data?.avatar_url ?? null,
        nickname: data?.nickname ?? user.email?.split("@")[0] ?? null,
      });
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50" {...sideMenuOverlayMotion}>
          <button
            aria-label={t("sideMenu.ariaClose")}
            className="absolute inset-0 bg-[#06101d]/26 backdrop-blur-[3px]"
            onClick={close}
            type="button"
          />
          <motion.aside
            aria-label={t("sideMenu.drawer")}
            className="absolute bottom-[calc(var(--safe-area-bottom)+0.9rem)] right-[max(0.75rem,calc((100vw-430px)/2+0.75rem))] top-[calc(var(--safe-area-top)+0.9rem)] flex w-[78vw] max-w-[340px] flex-col overflow-hidden rounded-[32px] border border-paper-soft/72 bg-paper-soft/74 shadow-[0_24px_70px_rgba(20,27,36,0.26)] backdrop-blur-2xl"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80 || info.velocity.x > 500) {
                close();
              }
            }}
            {...sideMenuDrawerMotion}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.66),transparent_28%),linear-gradient(135deg,rgba(126,96,48,0.08)_0_1px,transparent_1px_13px)]" />
            <motion.div
              animate={{ opacity: [0.12, 0.24, 0.12], scale: [0.96, 1.05, 0.96] }}
              className="pointer-events-none absolute -right-12 top-5 h-36 w-36 rounded-full bg-moon/45 blur-3xl"
              transition={{ duration: 7.8, ease: "easeInOut", repeat: Infinity }}
            />
            {dust.map((particle) => (
              <motion.span
                animate={{ opacity: [0.04, 0.14, 0.04], y: [0, -5, 0] }}
                className="pointer-events-none absolute size-1 rounded-full bg-[#fff8e8] shadow-[0_0_10px_rgba(255,248,232,0.22)]"
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

            <div className="relative z-10 flex items-start justify-between gap-3 px-5 pb-4 pt-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid size-[3.25rem] shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-paper-soft bg-olive text-base font-semibold text-paper-soft shadow-[0_10px_22px_rgba(86,62,33,0.12)]">
                  {profile.avatarUrl ? (
                    <span
                      aria-label="user avatar"
                      className="size-full bg-cover bg-center"
                      role="img"
                      style={{ backgroundImage: `url("${profile.avatarUrl}")` }}
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold leading-6 text-ink">
                    {profile.nickname ?? t("sideMenu.fallbackName")}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-ink-muted">
                    {status}
                  </p>
                </div>
              </div>
              <motion.button
                aria-label={t("common.close")}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-border/56 bg-paper-soft/60 text-ink-muted"
                onClick={close}
                type="button"
                whileTap={{ scale: 0.96 }}
              >
                <X className="size-4" />
              </motion.button>
            </div>

            <motion.div
              className="relative z-10 min-h-0 flex-1 space-y-5 overflow-y-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              variants={sideMenuListMotion}
            >
              <motion.div
                className="rounded-[24px] border border-border/46 bg-paper/24 px-4 py-3 text-xs leading-6 text-ink-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.32)]"
                variants={sideMenuItemMotion}
              >
                <span className="inline-flex items-center gap-1.5 text-olive-deep">
                  <Moon className="size-3.5" />
                  {t("sideMenu.noteTitle")}
                </span>
                <p className="mt-1">{t("sideMenu.noteBody")}</p>
              </motion.div>

              {menuGroups.map((group) => (
                <section className="space-y-2.5" key={group.labelKey}>
                  <motion.p
                    className="px-1 text-[11px] font-semibold tracking-[0.1em] text-ink-muted/68"
                    variants={sideMenuItemMotion}
                  >
                    {t(group.labelKey)}
                  </motion.p>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div key={item.titleKey}>
                        <MenuItem
                          icon={item.icon}
                          onClick={() => {
                            if (item.action === "language") {
                              setLanguageOpen((value) => !value);
                              return;
                            }

                            close();
                          }}
                          subtitle={
                            item.action === "language"
                              ? `${t(item.subtitleKey)} · ${getLanguageLabel(locale)}`
                              : t(item.subtitleKey)
                          }
                          title={t(item.titleKey)}
                        />
                        {item.action === "language" && languageOpen ? (
                          <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 grid gap-2 rounded-[18px] border border-border/45 bg-paper/36 p-2"
                            initial={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                          >
                            {locales.map((option) => (
                              <button
                                className={cn(
                                  "flex min-h-10 items-center justify-between rounded-[14px] px-3 text-sm text-ink-muted transition active:scale-[0.985]",
                                  locale === option && "bg-olive-soft/72 font-semibold text-olive-deep"
                                )}
                                key={option}
                                onClick={() => setLocale(option as Locale)}
                                type="button"
                              >
                                <span>{getLanguageLabel(option)}</span>
                                {locale === option ? <Check className="size-4" /> : null}
                              </button>
                            ))}
                          </motion.div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <section className="mt-auto space-y-2 border-t border-border/36 pt-4">
                {lowPriorityItems.map((item) => (
                  <MenuItem
                    icon={item.icon}
                    key={item.titleKey}
                    muted
                    onClick={close}
                    subtitle={t(item.subtitleKey)}
                    title={t(item.titleKey)}
                  />
                ))}
              </section>
            </motion.div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import { Archive, Heart, Mail, Send, UserRound } from "lucide-react";
import { PaperCard } from "@/components/shared/PaperCard";
import { WashiTape } from "@/components/decorative/WashiTape";
import { ProfileAvatarUpload } from "@/components/profile/ProfileAvatarUpload";
import { ProfilePenpalCard } from "@/components/profile/ProfilePenpalCard";
import { useI18n } from "@/src/i18n/useI18n";
import type { Penpal } from "@/src/lib/db/penpals";
import type { LetterWithPenpal } from "@/types/letter";

type ProfilePlaceholderProps = {
  avatarUrl?: string | null;
  letters: LetterWithPenpal[];
  nickname?: string | null;
  penpals: Penpal[];
  userId?: string | null;
};

export function ProfilePlaceholder({
  avatarUrl,
  letters,
  nickname,
  penpals,
  userId,
}: ProfilePlaceholderProps) {
  const { t } = useI18n();
  const discoveredPenpalIds = new Set(penpals.map((penpal) => penpal.id));
  const repliedLetters = letters.filter(
    (letter) => letter.status === "replied" && discoveredPenpalIds.has(letter.penpalId)
  );
  const latestLetter = repliedLetters[0];
  const greetingName = nickname?.trim() || t("sideMenu.fallbackName");
  const stats = [
    { label: t("profile.statsReceived"), value: repliedLetters.length, icon: Mail },
    { label: t("profile.statsSent"), value: letters.length, icon: Send },
    { label: t("profile.statsPenpals"), value: penpals.length, icon: UserRound },
  ];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-paper border border-border bg-paper-soft/88 px-5 pb-5 pt-6 shadow-paper">
        <div className="absolute -right-12 -top-12 size-32 rounded-full bg-moon/20 blur-2xl" />
        <WashiTape className="absolute right-8 top-3 h-5 w-16 opacity-55" tone="sand" />
        <div className="absolute right-5 top-[82px] grid size-9 place-items-center rounded-full bg-[#a75f4e] text-[#f8e8c8] shadow-[inset_0_-4px_8px_rgba(76,34,26,0.25),0_8px_18px_rgba(82,43,34,0.16)]">
          <Heart className="size-4" fill="currentColor" />
        </div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="relative shrink-0">
            <ProfileAvatarUpload
              avatarUrl={avatarUrl}
              fallbackLabel={greetingName}
              userId={userId}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-ink-muted">
              {t("profile.greeting")}
              {greetingName}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">{t("profile.title")}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{t("profile.todayNote")}</p>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-paper-deep/70 px-3 py-1.5 text-xs text-ink-muted"
              >
                <Icon className="size-3.5 text-olive-deep" />
                {item.label} · {item.value}
              </span>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-semibold text-ink">{t("profile.myPenpals")}</h3>
          <span className="text-xs text-ink-muted">{t("profile.savedFaraway")}</span>
        </div>
        {penpals.length > 0 ? (
          <div className="-mx-page flex snap-x gap-3 overflow-x-auto px-page pb-2 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {penpals.map((penpal, index) => (
              <ProfilePenpalCard key={penpal.id} penpal={penpal} index={index} />
            ))}
          </div>
        ) : (
          <PaperCard className="bg-paper-deep/45 p-4">
            <p className="text-sm leading-6 text-ink-muted">
              {t("inbox.empty.firstBody")}
            </p>
          </PaperCard>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-semibold text-ink">{t("profile.recentLetters")}</h3>
          <Archive className="size-4 text-ink-muted" />
        </div>
        <PaperCard className="relative overflow-hidden p-4">
          <WashiTape className="absolute -top-2 right-10 h-4 w-14 opacity-45" tone="rose" />
          {latestLetter ? (
            <div className="flex gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-[12px] border border-dashed border-border bg-paper-deep text-olive-deep">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-ink-muted">From. {latestLetter.penpal.name}</p>
                <h4 className="mt-1 text-base font-semibold text-ink">
                  {t("inbox.tabs.received")} · {latestLetter.penpal.name}
                </h4>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
                  {latestLetter.content}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-6 text-ink-muted">
              {t("inbox.empty.receivedBody")}
            </p>
          )}
        </PaperCard>
      </section>

      <PaperCard className="bg-paper-deep/45 p-4">
        <p className="text-sm leading-6 text-ink-muted">
          {t("loading.letter")}
        </p>
      </PaperCard>
    </div>
  );
}

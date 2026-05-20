"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { EncounterButton } from "@/components/discover/EncounterButton";
import { MapPin } from "@/components/discover/MapPin";
import { PenpalPreviewCard } from "@/components/discover/PenpalPreviewCard";
import type { EncounterStatus } from "@/src/lib/db/encounters";
import discoverMap from "@/.docs/discoverMap.png";

type PenpalMapProps = {
  encounterStatus: EncounterStatus | null;
  penpals: MockPenpal[];
};

const discoverMapPositions: Record<string, { top: string; left: string }> = {
  luna: { top: "31%", left: "50%" },
  oliver: { top: "31%", left: "19%" },
  xiaoxing: { top: "43%", left: "78%" },
};

function getSignalText(status: EncounterStatus | null) {
  if (!status) {
    return "登录后可以继续寻找远方的信号";
  }

  if (status.discoveredCount === 0) {
    return status.sentLettersCount > 0
      ? "你的第一封漂流信正在路上"
      : "先写下第一封漂流信，寄向未知远方";
  }

  if (status.allDiscovered) {
    return "你已经点亮了目前所有的远方地址";
  }

  if (status.availableEncounterCount > 0) {
    return `你有 ${status.availableEncounterCount} 次远方信号`;
  }

  return `再寄出 ${status.lettersNeededForNextEncounter} 封信，就能获得新的远方信号`;
}

function getButtonLabel(status: EncounterStatus | null) {
  if (!status) {
    return "登录后继续探索";
  }

  if (status.discoveredCount === 0) {
    return status.sentLettersCount > 0
      ? "回到信箱，等待远方回信"
      : "写下第一封漂流信";
  }

  if (status.allDiscovered) {
    return "等待新的远方地址";
  }

  if (status.availableEncounterCount > 0) {
    return "写一封信寄向未知远方";
  }

  return "继续写信，积攒远方信号";
}

export function PenpalMap({ encounterStatus, penpals }: PenpalMapProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(penpals[0]?.id);
  const status = encounterStatus;
  const activePenpal =
    penpals.find((penpal) => penpal.id === activeId) ?? penpals[0];
  const allDiscovered = Boolean(status?.allDiscovered);
  const isFirstEncounterStage = Boolean(status && status.discoveredCount === 0);
  const hasEncounterCredit = Boolean(
    status && status.availableEncounterCount > 0 && !status.allDiscovered
  );

  function handleEncounter() {
    if (isFirstEncounterStage) {
      router.push(status && status.sentLettersCount > 0 ? "/inbox" : "/letters/first");
      return;
    }

    if (allDiscovered) {
      toast("目前所有远方的地址都已经被你点亮啦。");
      return;
    }

    if (!hasEncounterCredit) {
      router.push(penpals.length > 0 ? "/letters" : "/letters/first");
      return;
    }

    router.push("/letters/unknown");
  }

  return (
    <section className="relative min-h-[680px] overflow-hidden px-page pb-8 pt-2">
      <div className="pointer-events-none absolute inset-x-0 top-[-28px] h-[610px]">
        <Image
          src={discoverMap}
          alt=""
          fill
          priority
          sizes="430px"
          className="object-cover object-center opacity-95 [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_78%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--paper)_0%,rgba(248,239,217,0.08)_15%,rgba(248,239,217,0.02)_54%,rgba(248,239,217,0.72)_84%,var(--paper)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_8%,rgba(255,255,255,0.34),transparent_34%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_18%_22%,rgba(63,52,40,0.08)_0_1px,transparent_1px_24px)]" />
      </div>

      <div className="relative h-[520px]">
        {penpals.map((penpal) => {
          const position = discoverMapPositions[penpal.id] ?? penpal.mapPosition;

          return (
            <MapPin
              key={penpal.id}
              active={penpal.id === activePenpal.id}
              color={penpal.color}
              label={penpal.name}
              left={position.left}
              top={position.top}
              onClick={() => setActiveId(penpal.id)}
            />
          );
        })}

        {activePenpal ? (
          <div className="absolute inset-x-4 bottom-0 z-20">
            <PenpalPreviewCard penpal={activePenpal} />
          </div>
        ) : (
          <div className="absolute inset-x-4 bottom-0 z-20 rounded-card border border-border bg-paper-soft/92 p-card text-center shadow-paper">
            <h2 className="text-xl font-semibold text-ink">你的世界地图还没有亮起</h2>
            <p className="mx-auto mt-2 max-w-[280px] text-sm leading-6 text-ink-muted">
              {status && status.sentLettersCount > 0
                ? "第一封信已经出发。等回信抵达，新的地址才会在这里亮起来。"
                : "先写下第一封漂流信。等回信抵达，新的地址才会在这里亮起来。"}
            </p>
          </div>
        )}
      </div>

      <div className="relative z-20 mx-auto mt-5 max-w-[320px]">
        <div className="mb-3 rounded-card border border-border/70 bg-paper-soft/86 px-4 py-3 text-center shadow-[0_8px_18px_rgba(89,64,33,0.08)]">
          {allDiscovered ? (
            <>
              <h2 className="text-base font-semibold text-ink">
                {"远方暂时安静下来了"}
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-ink-muted">
                {"你已经认识了目前所有的笔友。也许过一阵子，会有新的地址被风送来。"}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium leading-6 text-ink">
              {getSignalText(status)}
            </p>
          )}
        </div>
        <EncounterButton
          className="w-full"
          label={getButtonLabel(status)}
          onClick={handleEncounter}
        />
      </div>
    </section>
  );
}

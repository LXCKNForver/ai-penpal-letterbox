"use client";

import Image from "next/image";
import { useState } from "react";
import type { MockPenpal } from "@/src/lib/mock/penpals";
import { EncounterButton } from "@/components/discover/EncounterButton";
import { MapPin } from "@/components/discover/MapPin";
import { PenpalPreviewCard } from "@/components/discover/PenpalPreviewCard";
import discoverMap from "@/.docs/discoverMap.png";

type PenpalMapProps = {
  penpals: MockPenpal[];
};

const discoverMapPositions: Record<string, { top: string; left: string }> = {
  luna: { top: "31%", left: "50%" },
  oliver: { top: "31%", left: "19%" },
  xiaoxing: { top: "43%", left: "78%" },
};

export function PenpalMap({ penpals }: PenpalMapProps) {
  const [activeId, setActiveId] = useState(penpals[0]?.id);
  const activePenpal = penpals.find((penpal) => penpal.id === activeId) ?? penpals[0];

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

        <div className="absolute inset-x-4 bottom-0 z-20">
          <PenpalPreviewCard penpal={activePenpal} />
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-5 max-w-[300px]">
        <EncounterButton className="w-full" />
      </div>
    </section>
  );
}

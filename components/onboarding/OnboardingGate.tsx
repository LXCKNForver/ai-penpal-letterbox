"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLoading } from "@/src/components/loading";

const onboardingStorageKey = "hasSeenOnboarding";

export function OnboardingGate() {
  const router = useRouter();

  useEffect(() => {
    let nextRoute = "/onboarding";

    try {
      if (window.localStorage.getItem(onboardingStorageKey) === "true") {
        nextRoute = "/inbox";
      }
    } catch {
      nextRoute = "/onboarding";
    }

    router.replace(nextRoute);
  }, [router]);

  return <AppLoading message="正在打开慢慢信箱…" tone="night" />;
}

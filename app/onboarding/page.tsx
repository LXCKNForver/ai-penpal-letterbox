import { AppShell } from "@/components/layout/AppShell";
import { OnboardingExperience } from "@/components/onboarding/OnboardingExperience";

export default function OnboardingPage() {
  return (
    <AppShell showNav={false}>
      <OnboardingExperience />
    </AppShell>
  );
}

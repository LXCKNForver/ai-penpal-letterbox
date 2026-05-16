import { AuthLetterCard } from "@/components/auth/AuthLetterCard";
import { AppShell } from "@/components/layout/AppShell";

export default function LoginPage() {
  return (
    <AppShell showNav={false}>
      <AuthLetterCard mode="login" />
    </AppShell>
  );
}

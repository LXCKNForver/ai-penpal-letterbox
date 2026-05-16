import { AuthLetterCard } from "@/components/auth/AuthLetterCard";
import { AppShell } from "@/components/layout/AppShell";

export default function RegisterPage() {
  return (
    <AppShell showNav={false}>
      <AuthLetterCard mode="register" />
    </AppShell>
  );
}

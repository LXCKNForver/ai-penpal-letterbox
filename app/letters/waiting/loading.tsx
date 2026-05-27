import { AppShell } from "@/components/layout/AppShell";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <div className="px-page pb-6 pt-12">
        <LetterLoading count={2} message="正在等海风带来回信…" />
      </div>
    </AppShell>
  );
}

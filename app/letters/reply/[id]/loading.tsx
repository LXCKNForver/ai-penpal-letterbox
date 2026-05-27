import { AppShell } from "@/components/layout/AppShell";
import { LetterLoading } from "@/src/components/loading";

export default function Loading() {
  return (
    <AppShell>
      <div className="px-page pb-8 pt-14">
        <LetterLoading count={2} message="正在展开远方来信…" />
      </div>
    </AppShell>
  );
}

import { redirect } from "next/navigation";

export default function LegacyNewLetterPage() {
  redirect("/letters/new");
}

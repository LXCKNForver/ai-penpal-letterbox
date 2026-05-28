import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProfilePlaceholder } from "@/components/profile/ProfilePlaceholder";
import { SignOutButton } from "@/components/profile/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import { getUserLetters } from "@/src/lib/db/letters";
import { getUserPenpals } from "@/src/lib/db/userPenpals";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profileResult, penpals, letters] = user
    ? await Promise.all([
        supabase
          .from("profiles")
          .select("nickname, avatar_url")
          .eq("id", user.id)
          .maybeSingle(),
        getUserPenpals(user.id),
        getUserLetters(user.id),
      ])
    : [{ data: null }, [], []];

  const profile = profileResult.data;

  return (
    <>
      <MobileHeader
        title={"\u6211\u7684\u4fe1\u7bb1\u89d2\u843d"}
        subtitle={"\u6574\u7406\u4fe1\u4ef6\u3001\u7b14\u53cb\u548c\u56de\u5fc6"}
        titleKey="header.profile.title"
        subtitleKey="header.profile.subtitle"
      />
      <PageContainer>
        <ProfilePlaceholder
          avatarUrl={profile?.avatar_url}
          letters={letters}
          nickname={profile?.nickname}
          penpals={penpals}
          userId={user?.id}
        />
        <div className="mt-5">
          <SignOutButton />
        </div>
      </PageContainer>
    </>
  );
}

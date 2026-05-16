import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProfilePlaceholder } from "@/components/profile/ProfilePlaceholder";

export default function ProfilePage() {
  return (
    <AppShell>
      <MobileHeader
        title={"\u6211\u7684\u4fe1\u7bb1\u89d2\u843d"}
        subtitle={"\u6574\u7406\u4fe1\u4ef6\u3001\u7b14\u53cb\u548c\u56de\u5fc6"}
      />
      <PageContainer>
        <ProfilePlaceholder />
      </PageContainer>
    </AppShell>
  );
}

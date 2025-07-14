import SettingsLayout from "@/components/layouts/settings/settings-layout";
import UserProfileForm from "@/components/settings/user-profile-form";
import Heading from "@/components/ui/heading";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import route from "ziggy-js";

export default function Profile() {
  const { auth } = usePage<SharedData>().props;
  return (
    <SettingsLayout
      title="Profile"
      breadcrumbs={[
        { label: "Settings", href: route("settings") },
        { label: "Profile", href: route("settings.profile") },
      ]}
    >
      <Heading title="Profile" description="Manage your profile settings" size="small" />
      <UserProfileForm user={auth.user} />
    </SettingsLayout>
  );
}

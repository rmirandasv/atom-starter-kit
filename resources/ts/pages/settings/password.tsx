import SettingsLayout from "@/components/layouts/settings/settings-layout";
import ChangePasswordForm from "@/components/settings/change-password-form";
import TwoFactorAuthForm from "@/components/settings/two-factor-auth-form";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import route from "ziggy-js";

export default function Password({
  status,
}: {
  status?: "two-factor-authentication-enabled" | null;
}) {
  return (
    <SettingsLayout
      title="Account password"
      breadcrumbs={[
        { label: "Home", href: route("dashboard") },
        { label: "Settings", href: route("settings") },
        { label: "Password", href: route("settings.password") },
      ]}
    >
      <Heading
        size="small"
        title="Account password"
        description="Change your password, manage your security settings, and more."
      />
      <ChangePasswordForm />
      <Separator className="my-6" />
      <Heading
        size="small"
        title="Two-factor authentication"
        description="Add an extra layer of security to your account."
      />
      <TwoFactorAuthForm status={status} />
    </SettingsLayout>
  );
}

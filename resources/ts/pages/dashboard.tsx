import AppLayout from "@/components/layouts/app/app-layout";
import Heading from "@/components/ui/heading";
import route from "ziggy-js";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard" breadcrumbs={[{ href: route("dashboard"), label: "Dashboard" }]}>
      <Heading title="Dashboard" description="Welcome to your dashboard" />
    </AppLayout>
  );
}

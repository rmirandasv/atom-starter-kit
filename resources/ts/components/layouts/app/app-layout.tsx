import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppBreadcrumbItem, SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import AppBreadcrumb from "./app-breadcrumb";
import { AppSidebar } from "./app-sidebar";

type AppLayoutProps = {
  title?: string;
  children: ReactNode;
  breadcrumbs?: AppBreadcrumbItem[];
};

export default function AppLayout({ title, breadcrumbs, children }: AppLayoutProps) {
  const { flash } = usePage<SharedData>().props;

  useEffect(() => {
    if (flash && flash.message) {
      toast(flash.message);
    }
  }, [flash]);

  return (
    <SidebarProvider>
      <Head title={title} />
      <div className="flex min-h-screen w-full bg-background antialiased">
        <AppSidebar />
        <div className="flex w-full flex-col">
          <div className="flex items-center space-x-3 px-4 py-3">
            <SidebarTrigger />
            {breadcrumbs && breadcrumbs.length > 0 && <AppBreadcrumb items={breadcrumbs} />}
          </div>
          <main className="mx-auto w-full p-6">{children}</main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}

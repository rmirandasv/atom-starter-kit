import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode, useEffect } from "react";
import { AppSidebar } from "./app-sidebar";
import { Head, usePage } from "@inertiajs/react";
import { AppBreadcrumbItem, SharedData } from "@/types";
import AppBreadcrumb from "./app-breadcrumb";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type AppLayoutProps = {
  title?: string;
  children: ReactNode;
  breadcrumbs?: AppBreadcrumbItem[];
};

export default function AppLayout({
  title,
  breadcrumbs,
  children,
}: AppLayoutProps) {
  const { flash } = usePage<SharedData>().props;

  useEffect(() => {
    if (flash && flash.message) {
      toast(flash.message);
    }
  }, [flash]);

  return (
    <SidebarProvider>
      <Head title={title} />
      <div className="min-h-screen flex w-full bg-background antialiased">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <div className=" px-4 py-3 flex items-center space-x-3">
            <SidebarTrigger />
            {breadcrumbs && breadcrumbs.length > 0 && (
              <AppBreadcrumb items={breadcrumbs} />
            )}
          </div>
          <main className="p-6 w-full mx-auto">{children}</main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}

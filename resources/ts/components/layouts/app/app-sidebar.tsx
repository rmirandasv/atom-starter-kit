import { Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import route from "ziggy-js";
import AccountDropdown from "./account-dropdown";

const items = [
  {
    title: "Home",
    routeName: "dashboard",
    icon: Home,
  },
];

export function AppSidebar() {
  const { appName } = usePage<SharedData>().props;
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">{appName}</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={route().current(item.routeName)}>
                    <Link href={route(item.routeName)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AccountDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}

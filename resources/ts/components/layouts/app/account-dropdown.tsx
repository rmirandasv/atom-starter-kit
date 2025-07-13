import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { type SharedData } from "@/types";
import useInitials from "@/hooks/use-initials";
import route from "ziggy-js";

export default function AccountDropdown() {
  const { auth } = usePage<SharedData>().props;
  const { initials, firstName } = useInitials(auth.user.name);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row justify-between items-center cursor-pointer px-2 py-2 bg-background rounded-md">
        <div className="flex flex-row items-center space-x-2">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{firstName}</span>
        </div>
        <ChevronsUpDown className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
        <DropdownMenuLabel>
          <div className="flex flex-row items-start space-x-2">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{firstName}</span>
              <span className="text-xs text-muted-foreground">
                {auth.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            href={route("settings.profile")}
            className="flex flex-row items-center space-x-2 w-full"
          >
            <Settings className="size-5" />
            <span>Settins</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            href={route("logout")}
            method="post"
            className="flex flex-row items-center space-x-2 w-full"
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

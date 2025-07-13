import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronsUpDown, Users  } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { type SharedData } from "@/types";
import useInitials from "@/hooks/use-initials";
import route from "ziggy-js";

export default function TeamsDropdown() {
  const { auth } = usePage<SharedData>().props;
  const { initials } = useInitials(auth.user.currentTeam.name);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row justify-between items-center cursor-pointer px-2 py-2 bg-background rounded-md">
        <div className="flex flex-row items-center space-x-2">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">
            {auth.user.currentTeam.name}
          </span>
        </div>
        <ChevronsUpDown className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
        <DropdownMenuLabel>Teams</DropdownMenuLabel>
        {auth.user.teams.map((team) => (
          <DropdownMenuItem key={team.id} className="cursor-pointer" asChild>
            <Link method="post" href={route("settings.teams.switch", team.id)} className="w-full">
              <span>{team.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={route("settings.teams")} className="flex flex-row items-center space-x-1">
          <Users className="size-5" />
            <span>Manage Teams</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

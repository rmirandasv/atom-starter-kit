export type User = {
  id: number;
  name: string;
  email: string;
  profile_photo_path: string;
  created_at: string;
  updated_at: string;
  email_verified_at?: string;
  two_factor_confirmed_at: string | null;
  current_team_id: number;
  teams: Team[];
  currentTeam: Team;
  pivot?: {
    team_id: number;
    user_id: number;
    role: string;
  };
};

export type Team = {
  id: number;
  name: string;
  personal_team: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
  members: User[];
  invitations: TeamInvitation[];
  pivot?: {
    user_id: number;
    team_id: number;
    role: string;
  };
  members_count: number;
};

export type TeamInvitation = {
  id: number;
  team_id: number;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  team?: Team;
};

export type Auth = {
  user: User;
};

export type SharedData = {
    auth: Auth;
    status: string | null;
    flash: Flash | null;
};

export type Flash = {
  type: string;
  message: string;
};

export type AppBreadcrumbItem = {
  label: string;
  href: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  profile_photo_path: string;
  created_at: string;
  updated_at: string;
  email_verified_at?: string;
  two_factor_confirmed_at: string | null;
};

export type Auth = {
  user: User;
};

export type SharedData = {
  appName: string;
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

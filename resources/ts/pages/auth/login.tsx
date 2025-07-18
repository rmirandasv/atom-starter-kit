import LoginForm from "@/components/auth/login-form";
import Heading from "@/components/ui/heading";
import { Link } from "@inertiajs/react";
import route from "ziggy-js";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex min-w-sm flex-col px-8 lg:px-0">
        <Heading title="Login in to your account" description="Enter your credentials to access your account." center />
        <LoginForm />
        <p className="mt-8 flex justify-center text-sm text-muted-foreground">
          Don't have an account?&nbsp;
          <Link href={route("register")} className="font-medium underline" prefetch>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

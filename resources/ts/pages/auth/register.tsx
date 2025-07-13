import RegisterForm from "@/components/auth/register-form";
import Heading from "@/components/ui/heading";
import { Link } from "@inertiajs/react";
import route from "ziggy-js";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex w-full max-w-sm flex-col px-8 lg:px-0">
        <Heading title="Create an account" description="Please fill in the form below to create an account." center />
        <RegisterForm />
        <p className="mt-8 flex justify-center text-sm text-muted-foreground">
          Already have an account?&nbsp;
          <Link href={route("login")} className="font-medium underline" prefetch>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

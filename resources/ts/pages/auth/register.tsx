import RegisterForm from "@/components/auth/register-form";
import Heading from "@/components/ui/heading";
import { Link } from "@inertiajs/react";
import route from "ziggy-js";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-sm w-full px-8 lg:px-0 flex flex-col">
        <Heading
          title="Create an account"
          description="Please fill in the form below to create an account."
          center
        />
        <RegisterForm />
        <p className="mt-8 flex justify-center text-sm text-muted-foreground">
          Already have an account?&nbsp;
          <Link
            href={route("login")}
            className="font-medium underline"
            prefetch
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

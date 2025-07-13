import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Link } from "@inertiajs/react";
import route from "ziggy-js";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background antialiased">
      <div className="flex items-center justify-end space-x-3 bg-background px-4 py-3">
        <Button asChild>
          <Link href={route("login")}>Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={route("register")}>Register</Link>
        </Button>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6">
        <Heading size="large" title="Welcome to your new app!" description="This is a simple starter template for your new app." />
        <Heading title="Technologies used" />
        <ul className="mb-8 list-inside list-disc text-muted-foreground">
          <li>Laravel</li>
          <li>Inertia.js</li>
          <li>Typescript</li>
          <li>React</li>
          <li>Tailwindcss</li>
          <li>Shadcn</li>
        </ul>
        <Heading title="Features" />
        <ul className="list-inside list-disc text-muted-foreground">
          <li>Authentication</li>
          <li>Two factor authentication</li>
          <li>Registration</li>
          <li>Forgot password</li>
          <li>Reset password</li>
          <li>User profile</li>
          <li>Team management</li>
          <li>Team invitations (email)</li>
          <li>Team switching</li>
          <li>Theme (light/dark/system)</li>
        </ul>
      </div>
    </div>
  );
}

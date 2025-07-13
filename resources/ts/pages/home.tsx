import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Link } from "@inertiajs/react";
import route from "ziggy-js";

export default function Home() {
  return (
    <div className="min-h-screen bg-background antialiased flex flex-col">
      <div className="px-4 py-3 flex items-center justify-end space-x-3 bg-background">
        <Button asChild>
          <Link href={route("login")}>Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={route("register")}>Register</Link>
        </Button>
      </div>
      <div className="max-w-7xl w-full mx-auto py-6 px-4 flex flex-col">
        <Heading
          size="large"
          title="Welcome to your new app!"
          description="This is a simple starter template for your new app."
        />
        <Heading title="Technologies used" />
        <ul className="list-disc list-inside text-muted-foreground mb-8">
          <li>Laravel</li>
          <li>Inertia.js</li>
          <li>Typescript</li>
          <li>React</li>
          <li>Tailwindcss</li>
          <li>Shadcn</li>
        </ul>
        <Heading title="Features" />
        <ul className="list-disc list-inside text-muted-foreground">
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

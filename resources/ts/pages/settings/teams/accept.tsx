import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { SharedData, Team, TeamInvitation } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AcceptInvitation({
  team,
}: {
  team: Team;
  invitation: TeamInvitation;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { url } = usePage();
  const { auth } = usePage<SharedData>().props;
  const handleAccept = () => {
    router.post(url, {}, {
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
    })
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto flex flex-col">
        <Heading title={`Accept Invitation to ${team.name}`} size="large" />
        <p className="text-muted-foreground text-base mb-4">
          Hello {auth.user.name}, you have been invited to join the team&nbsp;
          <strong>{team.name}</strong> .To accept the invitation, please click
          the button below.
        </p>
        <Button onClick={handleAccept} disabled={loading} className="w-full">
          {loading ? "Accepting..." : "Accept Invitation"}
        </Button>
      </div>
    </div>
  );
}

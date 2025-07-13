import SettingsLayout from "@/components/layouts/settings/settings-layout";
import InviteTeamMemberDialog from "@/components/settings/invite-team-member";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SharedData, Team, User } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { Fragment, useCallback, useState } from "react";
import route from "ziggy-js";

export default function ShowTeamPage({
  team,
  members,
}: {
  team: Team;
  members: User[];
}) {
  const { auth } = usePage<SharedData>().props;
  const [loading, setLoading] = useState<boolean>(false);
  const [revoking, setRevoking] = useState<boolean>(false);

  const handleDeleteTeam = useCallback(() => {
    router.delete(route("settings.teams.destroy", { team: team.id }), {
      onBefore: () => setLoading(true),
      onFinish: () => setLoading(false),
    });
  }, [team.id]);
  const handleRevokeInvite = useCallback(
    (inviteId: number) => {
      router.delete(
        route("settings.teams.invite.destroy", {
          team: team.id,
          invite: inviteId,
        }),
        {
          onStart: () => setRevoking(true),
          onFinish: () => setRevoking(false),
        }
      );
    },
    [team.id]
  );
  const handleRemoveMember = useCallback(
    (memberId: number) => {
      router.delete(
        route("settings.teams.remove", {
          team: team.id,
          user: memberId,
        }),
        {
          onStart: () => setLoading(true),
          onFinish: () => setLoading(false),
        }
      );
    },
    [team.id]
  );
  const handleLeaveTeam = useCallback(() => {
    router.delete(route("settings.teams.leave", { team: team.id }), {
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
    });
  }, [team.id]);
  return (
    <SettingsLayout
      title="Team"
      breadcrumbs={[
        { href: route("settings.profile"), label: "Settings" },
        { href: route("settings.teams"), label: "Teams" },
        {
          href: route("settings.teams.show", { team: team.id }),
          label: team.name,
        },
      ]}
    >
      <Heading
        title={team.name}
        description="Manage your team settings and members."
        size="small"
      />
      <div className="flex flex-col p-4 border rounded-md border-border">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{team.name}</span>
            {team.personal_team === true && team.user_id === auth.user.id && (
              <span className="text-sm text-muted-foreground">
                Personal Team
              </span>
            )}
            {!team.personal_team && (
              <span className="text-sm text-muted-foreground">
                {members.find((m) => m.id === auth.user.id)?.pivot?.role}
              </span>
            )}
          </div>
        </div>
        <Separator orientation="horizontal" className="my-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">
              {members.length}&nbsp;
              {members.length === 1 ? "Member" : "Members"}
            </span>
          </div>
          {(team.user_id === auth.user.id ||
            team.members.find((member) => member.id === auth.user.id)?.pivot
              ?.role === "admin") && <InviteTeamMemberDialog team={team} />}
        </div>
        <ul className="mt-4 flex flex-col gap-2 px-2">
          {members.map((member, index) => (
            <Fragment key={`member-${member.id}`}>
              <li className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    {member.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {member.pivot?.role}
                  </span>
                </div>
                {team.user_id === auth.user.id &&
                  member.id !== auth.user.id && (
                    <Button variant="ghost" size="sm" disabled={loading} onClick={() => handleRemoveMember(member.id)}>
                      {loading ? "Removing..." : "Remove"}
                    </Button>
                  )}
              </li>
              {index < members.length - 1 && (
                <Separator orientation="horizontal" className="" />
              )}
            </Fragment>
          ))}
        </ul>
        {team.user_id === auth.user.id && team.invitations.length > 0 && (
          <Fragment>
            <Separator orientation="horizontal" className="my-2" />
            <span className="text-sm font-medium">Pending Invites</span>
            <ul className="mt-4 flex flex-col gap-2">
              {team.invitations.map((invite) => (
                <li
                  key={`invite-${invite.id}`}
                  className="flex flex-row items-center justify-between"
                >
                  <span className="text-sm text-muted-foreground">
                    {invite.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeInvite(invite.id)}
                    disabled={revoking}
                  >
                    {revoking ? "Revoking..." : "Revoke"}
                  </Button>
                </li>
              ))}
            </ul>
          </Fragment>
        )}
      </div>
      {team.user_id === auth.user.id && team.personal_team == false && (
        <div className="mt-4 p-4 border border-red-200 rounded-md bg-red-50">
          <h3 className="text-sm font-medium text-red-800">Delete Team</h3>
          <p className="mt-1 text-sm text-red-700">
            Deleting a team will remove all of its members and their access to
            the team. This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            className="mt-2"
            onClick={handleDeleteTeam}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Team"}
          </Button>
        </div>
      )}
      {team.user_id !== auth.user.id && (
        <div className="mt-4 p-4 border border-red-200 rounded-md bg-red-50">
          <h3 className="text-sm font-medium text-red-800">Leave Team</h3>
          <p className="mt-1 text-sm text-red-700">
            Leaving a team will remove you from the team and its members. This
            action cannot be undone.
          </p>
          <Button
            variant="destructive"
            className="mt-2"
            onClick={handleLeaveTeam}
            disabled={loading}
          >
            {loading ? "Leaving..." : "Leave Team"}
          </Button>
        </div>
      )}
    </SettingsLayout>
  );
}

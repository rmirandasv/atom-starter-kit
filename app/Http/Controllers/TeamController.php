<?php

namespace App\Http\Controllers;

use App\Actions\Team\CreateTeam;
use App\Actions\Team\DeleteTeam;
use App\Actions\Team\DeleteTeamInvitation;
use App\Actions\Team\InviteTeamMember;
use App\Actions\Team\JoinTeam;
use App\Actions\Team\LeaveTeam;
use App\Actions\Team\RemoveUserFromTeam;
use App\Actions\Team\SwitchCurrentTeam;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Team::class);

        $teams = $request->user()->teams()
            ->withCount('members')
            ->orderBy(column: 'personal_team', direction: 'desc')
            ->get();

        return Inertia::render(
            component: 'settings/teams/index',
            props: compact('teams')
        );
    }

    public function store(Request $request, CreateTeam $createTeam)
    {
        Gate::authorize('create', Team::class);

        $team = $createTeam->handle(user: $request->user(), data: $request->all());

        return redirect()
            ->route('settings.teams.show', ['team' => $team])
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('Team created successfully.'),
                ],
            ]);
    }

    public function show(Request $request, Team $team)
    {
        Gate::authorize('view', $team);

        return Inertia::render(
            component: 'settings/teams/show',
            props: [
                'team' => $team->load(['members', 'invitations']),
                'members' => $team->members,
            ]
        );
    }

    public function destroy(Request $request, Team $team, DeleteTeam $deleteTeam)
    {
        Gate::authorize('delete', $team);

        $deleteTeam->handle($request->user(), $team);

        return redirect()->route('settings.teams')
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('Team deleted successfully.'),
                ],
            ]);
    }

    public function invite(Request $request, Team $team, InviteTeamMember $inviteTeamMember)
    {
        Gate::authorize('invite', $team);

        $inviteTeamMember->handle(
            user: $request->user(),
            team: $team,
            email: $request->input('email'),
            role: $request->input('role')
        );

        return redirect()->route('settings.teams.show', ['team' => $team])
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('Team member invited successfully.'),
                ],
            ]);
    }

    public function switch(Request $request, Team $team, SwitchCurrentTeam $switchCurrentTeam)
    {
        $switchCurrentTeam->handle($request->user(), $team);

        return redirect()->route('dashboard')
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('Switched to team :name.', ['name' => $team->name]),
                ],
            ]);
    }

    public function accept(Team $team, Request $request)
    {
        Gate::authorize('accept', $team);

        return Inertia::render(
            component: 'settings/teams/accept',
            props: [
                'team' => $team,
                'invitation' => $request->user()->invitations()->where('team_id', $team->id)->first(),
            ]
        );
    }

    public function join(Team $team, Request $request, JoinTeam $joinTeam)
    {
        $joinTeam->handle($team, $request->user(), $request->input('invitation'));

        return redirect()->route('settings.teams.show', ['team' => $team])
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('You have joined the team :name.', ['name' => $team->name]),
                ],
            ]);
    }

    public function destroyInvite(Team $team, TeamInvitation $invite, DeleteTeamInvitation $deleteTeamInvitation)
    {
        $deleteTeamInvitation->handle($invite);

        return redirect()->route('settings.teams.show', ['team' => $team])
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('Team invitation deleted successfully.'),
                ],
            ]);
    }

    public function leave(Team $team, Request $request, LeaveTeam $leaveTeam)
    {
        $leaveTeam->handle($request->user(), $team);

        return redirect()->route('settings.teams')
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('You have left the team :name.', ['name' => $team->name]),
                ],
            ]);
    }

    public function removeUser(Team $team, User $user, Request $request, RemoveUserFromTeam $removeUserFromTeam)
    {
        Gate::authorize('removeUser', $team);

        $removeUserFromTeam->handle($request->user(), $team, $user);

        return redirect()->route('settings.teams.show', ['team' => $team])
            ->with([
                'flash' => [
                    'type' => 'success',
                    'message' => __('User removed from team successfully.'),
                ],
            ]);
    }
}

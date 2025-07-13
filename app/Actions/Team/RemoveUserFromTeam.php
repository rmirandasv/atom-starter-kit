<?php

namespace App\Actions\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class RemoveUserFromTeam
{
    public function handle(User $user, Team $team, User $userToRemove): void
    {
        Gate::authorize('removeUser', $team);

        $team->removeMember($userToRemove);

        $personalTeam = $userToRemove->teams()
            ->where('user_id', $userToRemove->id)
            ->where('personal_team', true)
            ->wherePivot('role', 'owner')
            ->first();

        if ($userToRemove->current_team_id === $team->id) {
            $userToRemove->current_team_id = $personalTeam->id;
            $userToRemove->save();
        }
    }
}
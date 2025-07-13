<?php

namespace App\Actions\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class LeaveTeam
{
    public function handle(User $user, Team $team): void
    {
        Gate::authorize('leave', $team);

        $team->removeMember($user);

        if ($user->current_team_id === $team->id) {
            $user->current_team_id = $user->teams()
                ->where('user_id', $user->id)
                ->where('personal_team', true)
                ->wherePivot('role', 'owner')
                ->first();
            $user->save();
        }
    }
}

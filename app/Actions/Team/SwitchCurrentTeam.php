<?php

namespace App\Actions\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class SwitchCurrentTeam
{
    public function handle(User $user, Team $team): void
    {
        Gate::forUser($user)->authorize('switchTeam', $team);

        $user->current_team_id = $team->id;
        $user->save();
    }
}
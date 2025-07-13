<?php

namespace App\Actions\Team;

use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class JoinTeam
{
    public function handle(Team $team, User $member, int $invitation): void
    {
        Gate::authorize('accept', $team);

        $invitation = TeamInvitation::findOrFail($invitation);

        $team->members()->attach($member, [
            'role' => $invitation->role,
        ]);

        $invitation->delete();
    }
}

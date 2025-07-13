<?php

namespace App\Actions\Team;

use App\Models\TeamInvitation;
use Illuminate\Support\Facades\Gate;

class DeleteTeamInvitation
{
    public function handle(TeamInvitation $invitation): void
    {
        Gate::authorize('delete', $invitation);

        $invitation->delete();
    }
}

<?php

namespace App\Actions\Team;

use App\Mail\TeamInvitationMail;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class InviteTeamMember
{
    public function handle(User $user, Team $team, string $email, string $role): void
    {
        $invitation = $team->invitations()->create([
            'email' => $email,
            'role' => $role,
        ]);

        $invitationUrl = URL::temporarySignedRoute(
            name: 'settings.teams.accept', 
            expiration: now()->addDays(7),
            parameters: [
                'team' => $team->id,
                'invitation' => $invitation->id,
            ]
        );

        Mail::to($email)->queue(new TeamInvitationMail(
            sender: $user,
            invitation: $invitation,
            email: $email,
            invitationUrl: $invitationUrl,
        ));
    }
}
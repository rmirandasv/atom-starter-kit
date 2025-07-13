<?php

namespace App\Actions\Team;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class CreateTeam
{
    /**
     * Create a new team for the given user.
     *
     * @param  array  $data{  name: string }
     */
    public function handle(User $user, array $data): Team
    {
        Validator::make(
            data: $data,
            rules: [
                'name' => ['required', 'string', 'max:255'],
            ],
        )->validate();

        $team = Team::create([
            'name' => $data['name'],
            'personal_team' => false,
            'user_id' => $user->id,
        ]);

        $team->members()->attach($user->id, [
            'role' => 'owner',
        ]);

        return $team;
    }
}

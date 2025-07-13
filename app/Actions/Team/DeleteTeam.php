<?php

namespace App\Actions\Team;

use App\Models\Team;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class DeleteTeam
{
    public function handle(User $user, Team $team): void
    {
        if ($user->id !== $team->user_id) {
            throw new \Exception('You are not authorized to delete this team.');
        }

        DB::beginTransaction();
        try {
            if ($user->current_team_id === $team->id) {
                $user->current_team_id = $user->teams()
                    ->where('user_id', $user->id)
                    ->where('personal_team', true)
                    ->first();
                $user->save();
            }
            $team->members()->detach();
            $team->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }
    }
}
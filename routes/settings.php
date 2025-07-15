<?php

use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {

    Route::redirect(
        '/settings',
        '/settings/profile'
    )
        ->name('settings');

    Route::get(
        '/settings/profile',
        [SettingsController::class, 'profile']
    )
        ->name('settings.profile');

    Route::get(
        '/settings/password',
        [SettingsController::class, 'password']
    )
        ->name('settings.password');

    Route::get(
        '/settings/theme',
        [SettingsController::class, 'theme']
    )
        ->name('settings.theme');

    Route::get(
        '/settings/teams',
        [TeamController::class, 'index']
    )
        ->name('settings.teams');

    Route::get(
        '/settings/teams/{team}',
        [TeamController::class, 'show']
    )
        ->name('settings.teams.show');

    Route::get(
        '/settings/teams/{team}/accept',
        [TeamController::class, 'accept']
    )
        ->name('settings.teams.accept')
        ->middleware('signed');

    Route::post(
        '/settings/teams/{team}/accept',
        [TeamController::class, 'join']
    )
        ->name('settings.teams.join')
        ->middleware('signed');

    Route::post(
        '/settings/teams',
        [TeamController::class, 'store']
    )
        ->name('settings.teams.store');

    Route::post(
        '/settings/teams/{team}/switch',
        [TeamController::class, 'switch']
    )
        ->name('settings.teams.switch');

    Route::post(
        '/settings/teams/{team}/invite',
        [TeamController::class, 'invite']
    )
        ->name('settings.teams.invite');

    Route::put(
        '/settings/teams/{team}',
        [TeamController::class, 'update']
    )
        ->name('settings.teams.update');

    Route::delete(
        '/settings/teams/{team}/invite/{invite}',
        [TeamController::class, 'destroyInvite']
    )
        ->name('settings.teams.invite.destroy');

    Route::delete(
        '/settings/teams/{team}/leave',
        [TeamController::class, 'leave']
    )
        ->name('settings.teams.leave');

    Route::delete(
        '/settings/teams/{team}/{user}',
        [TeamController::class, 'removeUser']
    )
        ->name('settings.teams.remove');

    Route::delete(
        '/settings/teams/{team}',
        [TeamController::class, 'destroy']
    )
        ->name('settings.teams.destroy')
        ->middleware('password.confirm');
});

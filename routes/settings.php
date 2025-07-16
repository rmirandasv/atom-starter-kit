<?php

use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

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
});

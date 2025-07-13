<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', fn () => Inertia::render('auth/login'))->name('login');
Route::get('/register', fn () => Inertia::render('auth/register'))->name('register');
Route::get('/login/2fa', fn () => Inertia::render('auth/2fa'))->name('two-factor.login');
Route::get('/forgot-password', fn () => Inertia::render('auth/forgot-password'))->name('password.request');
Route::get('/reset-password', fn () => Inertia::render('auth/reset-password'))->name('password.reset');

Route::middleware(['auth'])->group(function () {
    Route::get(
        '/user/confirm-password',
        fn () => Inertia::render('auth/confirm-password')
    )->name('password.confirm');
});

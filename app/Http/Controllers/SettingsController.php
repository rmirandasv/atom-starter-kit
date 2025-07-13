<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function profile()
    {
        return Inertia::render('settings/profile');
    }

    public function password(Request $request)
    {
        $status = $request->session()->get('status', null);
        return Inertia::render('settings/password', [
            'status' => $status,
        ]);
    }

    public function theme()
    {
        return Inertia::render('settings/theme');
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('layouts.app');
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }

    public function sendNotification()
    {

    }

    static function findAdmin() {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            $userAdmin = $user->organizations()->first()->users->where('role', '=', 'admin')->first();
        } else {
            $userAdmin = $user;
        }

        return $userAdmin;
    }
}

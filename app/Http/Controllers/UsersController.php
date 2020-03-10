<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function store(Request $request)
    {
        $userAdmin = Auth::user();
        $organization = $userAdmin->organizations->first();

        $newUser = new User;
        $newUser->fio = $request->fio;
        $newUser->password = bcrypt($request->password);
        $newUser->role = 'auditor';
        $newUser->email = $request->email;
        $newUser->active = '1';
        $newUser->save();

        $newUser->organizations()->attach($organization);
    }

    public function currentUser()
    {
        return response()->json([
            'currentUser' => Auth::user()
        ]);
    }

    public function showAuditors()
    {
        $userAdmin = Auth::user();
        $organization = $userAdmin->organizations->first();

        return response()->json([
            'auditors' => $organization->auditors
        ]);
    }

    public function showUser($id)
    {
        return response()->json([
            'user' => User::find($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->fio = $request->fio;
//        $user->password = bcrypt($request->password);
//        $user->date_birthday = $request->date_birthday;
//        $user->date_employment = $request->date_employment;
//        $user->medical_book = $request->medical_book;
//        $user->role = $request->role;
        $user->email = $request->email;
//        $user->organization_name = $request->organization_name;
        $user->save();
    }

    public function destroy($id)
    {
        User::destroy($id);
    }
}

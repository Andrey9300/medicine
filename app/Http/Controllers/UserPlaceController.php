<?php

namespace App\Http\Controllers;

use App\Http\Models\UserPlace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPlaceController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $place = new UserPlace;
        $place->name = $request->name;
        $place->user_id = $currentUser->id;
        $place->save();
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'places' => $currentUser->places()->get()
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();

        return response()->json([
            'place' => $currentUser->place($id)->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $place = $currentUser->place($id)->first();
        $place->name = $request->name;
        $place->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $place = $currentUser->place($id)->first();
        $place::destroy();
    }
}

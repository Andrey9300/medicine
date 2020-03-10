<?php

namespace App\Http\Controllers;

use App\Http\Models\UserLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserLocationController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $location = new UserLocation;
        $location->name = $request->name;
        $location->user_id = $currentUser->id;
        $location->save();
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'locations' => $currentUser->locations()->get()
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();

        return response()->json([
            'location' => $currentUser->location($id)->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $location = $currentUser->location($id)->first();
        $location->name = $request->name;
        $location->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $location = $currentUser->location($id)->first();
        $location::destroy();
    }
}

<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\Location;
use App\Http\Models\Audits\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();
        $location = Location::find($request->locationId);

        if (!$location || $location->id !== $currentUser->id) {
            return response()->json([
                'errors' => 'error'
            ]);
        }

        $place = new Place;
        $place->name = $request->name;
        $place->location_id = $location->id;
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
<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\Location;
use App\Http\Models\Audits\Place;
use App\Http\Models\Audits\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UnitController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $unit = new Units;
        $unit->name = $request->name;
        $unit->save();

        $currentUser->units()->attach($unit);
    }

    public function showAll()
    {
        $currentUser = Auth::user();
        $units = $currentUser->units()->get();

        foreach ($units as $unit) {
            $unit->locations = Location::where('unit_id', '=', $unit->id)->get();

            foreach ($unit->locations as $location) {
                $location->places = Place::where('location_id', '=', $location->id)->get();
            }
        }

        return response()->json([
            'units' => $units
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();
        $unit = $currentUser->units()->get()->where('id', $id)->first();

        return response()->json([
            'unit' => $unit
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $unit = $currentUser->units()->get()->where('id', $id)->first();
        $this->authorize('owner', $unit);
        $unit->name = $request->name;
        $unit->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $unit = $currentUser->units()->get()->where('id', $id)->first();
        $this->authorize('owner', $unit);
        $unit::destroy();
    }
}

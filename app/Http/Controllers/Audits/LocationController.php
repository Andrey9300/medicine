<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\Location;
use App\Http\Models\Audits\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocationController extends Controller
{
    public function store(Request $request)
    {
        $unit = Units::find($request->unitId);

        $this->authorize('owner', $unit);

        $location = new Location;
        $location->name = $request->name;
        $location->unit_id = $unit->id;
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
        $location = Location::find($id);
        $unit = Units::find($location->unit_id);
        $this->authorize('owner', $unit);

        return response()->json([
            'location' => $location
        ]);
    }

    public function update(Request $request, $id)
    {
        $location = Location::find($id);
        $unit = Units::find($location->unit_id);

        $this->authorize('owner', $unit);

        $location->name = $request->name;
        $location->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $location = $currentUser->location($id)->first();
        $unit = Units::find($location->unit_id);

        $this->authorize('owner', $unit);

        $location::destroy();
    }
}

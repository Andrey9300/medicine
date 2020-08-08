<?php

namespace App\Http\Controllers\Pest;

use App\Http\Models\Pest\PestLocation;
use App\Http\Models\Pest\PestPlace;
use Illuminate\Http\Request;

class PestPlaceController extends Controller
{
    public function store(Request $request)
    {
        $pestLocation = PestLocation::find($request->locationId);

        $this->authorize('owner', $pestLocation);

        $pestPlace = new PestPlace;
        $pestPlace->name = $request->name;
        $pestPlace->type = $request->type;
        $pestPlace->location_id = $pestLocation->id;
        $pestPlace->save();
    }

    public function show($id)
    {
        $pestPlace = PestPlace::find($id);
        $pestLocation = PestLocation::find($pestPlace->location_id);

        $this->authorize('owner', $pestLocation);

        return response()->json([
            'pestPlace' => $pestPlace
        ]);
    }

    public function showAllForLocation($id)
    {
        $pestLocation = PestLocation::find($id);

        $this->authorize('owner', $pestLocation);

        return response()->json([
            'pestPlaces' => $pestLocation->places()->get()
        ]);
    }

    public function update(Request $request, $id)
    {
        $pestPlace = PestPlace::find($id);
        $pestLocation = PestLocation::find($pestPlace->location_id);

        $this->authorize('owner', $pestLocation);

        $pestPlace->name = $request->name;
        $pestPlace->save();
    }

    public function destroy($id)
    {
        $pestPlace = PestPlace::find($id);
        $pestLocation = PestLocation::find($pestPlace->location_id);

        $this->authorize('owner', $pestLocation);

        $pestPlace->delete();
    }
}

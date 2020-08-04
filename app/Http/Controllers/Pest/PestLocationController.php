<?php

namespace App\Http\Controllers\Pest;

use App\Http\Models\Audits\Place;
use Illuminate\Http\Request;

class PestLocationController extends Controller
{
    public function store(Request $request)
    {
        $place = new Place;
        $place->name = $request->name;
        $place->location_id =  $request->id;
        $place->save();
    }

    public function show($id)
    {
        $place = Place::find($id);
        $this->authorize('owner', $place);

        return response()->json([
            'place' => $place
        ]);
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'places' => $currentUser->places()->get()
        ]);
    }

    public function update(Request $request, $id)
    {
        $place = Place::find($id);

        $this->authorize('owner', $place);

        $place->name = $request->name;
        $place->save();
    }

    public function destroy($id)
    {
        $place = Place::find($id);

        $this->authorize('owner', $place);

        $place->delete();
    }
}

<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\CriterionList;
use App\Http\Models\Audits\Location;
use App\Http\Models\Audits\Place;
use App\Http\Models\Audits\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();
        $location = Location::find($request->locationId);
        $unit = Units::find($location->unit_id);
        $this->authorize('owner', $unit);

        $place = new Place;
        $place->name = $request->name;
        $place->location_id = $location->id;
        $place->save();

        if (!$request->group_criterion_id) {
            return null;
        }

        $criterionList = new CriterionList;
        $criterionList->unit_id = $unit->id;
        $criterionList->location_id = $location->id;
        $criterionList->place_id = $place->id;
        $criterionList->group_criterion_id = $request->group_criterion_id;
        $criterionList->save();

        $currentUser->criterionLists()->attach($criterionList);
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
        $place = Place::find($id);
        $location = Location::find($place->location_id);
        $unit = Units::find($location->unit_id);
        $this->authorize('owner', $unit);
        $place->location = $location;
        $place->unit = $unit;

        return response()->json([
            'place' => $place
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $place = Place::find($id);
        $location = Location::find($place->location_id);
        $unit = Units::find($location->unit_id);

        $this->authorize('owner', $unit);

        $place->name = $request->name;
        $place->save();

        if (!$request->group_criterion_id) {
            return null;
        }

        $criterionList = new CriterionList;
        $criterionList->unit_id = $unit->id;
        $criterionList->location_id = $location->id;
        $criterionList->place_id = $place->id;
        $criterionList->group_criterion_id = $request->group_criterion_id;
        $criterionList->save();


        $currentUser->criterionLists()->attach($criterionList);
    }

    public function destroy($id)
    {
        $place = Place::find($id);
        $location = Location::find($place->location_id);
        $unit = Units::find($location->unit_id);

        $this->authorize('owner', $unit);

        $place::destroy();
    }
}

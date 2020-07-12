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

        if (!$location || $location->id !== $currentUser->id) {
            return response()->json([
                'errors' => 'error'
            ]);
        }

        $place = new Place;
        $place->name = $request->name;
        $place->location_id = $location->id;
        $place->save();

        $userCriterionList = new CriterionList;
        $userCriterionList->unit_id = $unit->id;
        $userCriterionList->location_id = $location->id;
        $userCriterionList->place_id = $place->id;
        $userCriterionList->group_criterion_id = $request->group_criterion_id;
        $userCriterionList->user_id = $currentUser->id;
        $userCriterionList->save();
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
        $place = Place::find($id);
        $location = Location::find($place->location_id);
        $unit = Units::find($location->unit_id);

        if (!$unit || $unit->user_id !== $currentUser->id) {
            return response()->json([
                'errors' => 'error'
            ]);
        }

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

        if (!$unit || $unit->id !== $currentUser->id) {
            return response()->json([
                'errors' => 'error'
            ]);
        }

        $place->name = $request->name;
        $place->save();

        if (!$request->group_criterion_id) {
            return null;
        }

        $userCriterionList = new CriterionList;
        $userCriterionList->unit_id = $unit->id;
        $userCriterionList->location_id = $location->id;
        $userCriterionList->place_id = $place->id;
        $userCriterionList->group_criterion_id = $request->group_criterion_id;
        $userCriterionList->user_id = $currentUser->id;
        $userCriterionList->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $place = $currentUser->place($id)->first();
        $place::destroy();
    }
}

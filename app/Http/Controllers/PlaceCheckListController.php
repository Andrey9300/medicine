<?php

namespace App\Http\Controllers;

use App\Http\Models\UserGroupCriterion;
use App\Http\Models\UserLocation;
use App\Http\Models\UserPlace;
use App\Http\Models\UserUnits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceCheckListController extends Controller
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

        $placeCheckList = $currentUser->criterionList($id)->first();
        $placeCheckList->unit = UserUnits::find($placeCheckList->unit_id);
        $placeCheckList->location = UserLocation::find($placeCheckList->location_id);
        $placeCheckList->place = UserPlace::find($placeCheckList->place_id);
        $placeCheckList->groupCriterion = UserGroupCriterion::find($placeCheckList->user_group_criterion_id);

        return response()->json([
            'placeCheckList' => $placeCheckList
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

<?php

namespace App\Http\Controllers;

use App\Http\Models\UserCriterionList;
use App\Http\Models\UserGroupCriterion;
use App\Http\Models\UserLocation;
use App\Http\Models\UserPlace;
use App\Http\Models\UserUnits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserCriterionListController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();
        $userCriterionList = new UserCriterionList;
        $userCriterionList->unit_id = $request->unit_id;
        $userCriterionList->location_id = $request->location_id;
        $userCriterionList->place_id = $request->place_id;
        $userCriterionList->user_group_criterion_id = $request->group_criterion_id;
        $userCriterionList->user_id = $currentUser->id;
        $userCriterionList->save();
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        $criterionLists = $currentUser->criterionLists()->get();

        foreach ($criterionLists as $criterionList) {
            $criterionList->unit = UserUnits::find($criterionList->unit_id);
            $criterionList->location = UserLocation::find($criterionList->location_id);
            $criterionList->place = UserPlace::find($criterionList->place_id);
            $criterionList->groupCriterion = UserGroupCriterion::find($criterionList->user_group_criterion_id);
        }

        return response()->json([
            'criterionLists' => $criterionLists
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();

        return response()->json([
            'criterionList' => $currentUser->criterionList($id)->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $criterion = $currentUser->criterionList($id)->first();
        $criterion->name = $request->name;
        $criterion->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $criterion = $currentUser->criterionList($id)->first();
        $criterion::destroy();
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Models\PlaceCheckListCriterion;
use App\Http\Models\PlaceCheckLists;
use App\Http\Models\UserCriterions;
use App\Http\Models\UserGroupCriterion;
use App\Http\Models\UserGroupCriterionList;
use App\Http\Models\UserLocation;
use App\Http\Models\UserPlace;
use App\Http\Models\UserUnits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceCheckListController extends Controller
{
    public function store(Request $request, $id)
    {
        $criterionIds = $request->criterionId;
        $marks = $request->mark;
        $comments = $request->comment;

        $placeCheckLists = new PlaceCheckLists;
        $placeCheckLists->user_criterion_lists_id = $id;
        $placeCheckLists->created_at = date('Y-m-d', time());
        $placeCheckLists->sended = false;
        $placeCheckLists->save();

        foreach ($criterionIds as $key => $value) {
            $placeCheckListCriterion = new PlaceCheckListCriterion;
            $placeCheckListCriterion->place_check_lists_id = $placeCheckLists->id;
            $placeCheckListCriterion->user_criterions_id = $value;
            $placeCheckListCriterion->mark = $marks[$key];
            $placeCheckListCriterion->comment_from_auditor = $comments[$key];
            $placeCheckListCriterion->save();
        }
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
        $groupCriterionList = UserGroupCriterionList::where('user_group_criterion_id', '=', $placeCheckList->groupCriterion->id)->get();
        $criterions = [];
        $placeCheckList->placeCheckLists = PlaceCheckLists::where('user_criterion_lists_id', '=', $placeCheckList->id)->get();

        foreach ($groupCriterionList as $groupCriterion) {
            $criterion = UserCriterions::find($groupCriterion->user_criterions_criterion_id);
            array_push($criterions, $criterion);
        }
        $placeCheckList->criterions = $criterions;

        return response()->json([
            'placeCheckList' => $placeCheckList
        ]);
    }

    public function criterions($id)
    {
//        $currentUser = Auth::user();
        $placeCheckListCriterions = PlaceCheckListCriterion::where('place_check_lists_id', '=', $id)->get();

        foreach ($placeCheckListCriterions as $placeCheckListCriterion) {
            $placeCheckListCriterion->criterion = UserCriterions::find($placeCheckListCriterion->user_criterions_id);
        }

        return response()->json([
            'placeCheckListCriterions' => $placeCheckListCriterions
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

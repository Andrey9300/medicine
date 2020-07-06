<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\PlaceCheckListCriterion;
use App\Http\Models\Lmk\PlaceCheckLists;
use App\Http\Models\Lmk\UserCriterions;
use App\Http\Models\Lmk\UserGroupCriterion;
use App\Http\Models\Lmk\UserGroupCriterionList;
use App\Http\Models\Lmk\UserLocation;
use App\Http\Models\Lmk\UserPlace;
use App\Http\Models\Lmk\UserUnits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceCheckListController extends Controller
{
    public function store(Request $request, $id)
    {
        $currentUser = Auth::user();
        $criterionIds = $request->criterionId;
        $marks = $request->mark;
        $comments = $request->comment;

        $placeCheckLists = new PlaceCheckLists;
        $placeCheckLists->user_criterion_lists_id = $id;
        $placeCheckLists->created_at = date('Y-m-d', time());
        $placeCheckLists->sended = false;
        $placeCheckLists->user_id = $currentUser->id;
        $placeCheckLists->save();

        foreach ($criterionIds as $key => $value) {
            $placeCheckListCriterion = new PlaceCheckListCriterion;
            $placeCheckListCriterion->place_check_lists_id = $placeCheckLists->id;
            $placeCheckListCriterion->user_criterions_id = $value;
            $placeCheckListCriterion->mark = $marks[$key];
            $placeCheckListCriterion->comment_from_auditor = $comments[$key];
            $placeCheckListCriterion->user_id = $currentUser->id;
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
        $placeCheckList->placeCheckLists = PlaceCheckLists::where(
            [
                ['user_criterion_lists_id', '=', $placeCheckList->id],
                ['user_id', '=', $currentUser->id],
            ]
        )->get();

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
        $currentUser = Auth::user();
        $placeCheckListCriterions = PlaceCheckListCriterion::where(
            [
                ['place_check_lists_id', '=', $id],
                ['user_id', '=', $currentUser->id],
            ]
        )->get();

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

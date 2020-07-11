<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\CriterionList;
use App\Http\Models\Audits\PlaceCheckListCriterion;
use App\Http\Models\Audits\PlaceCheckLists;
use App\Http\Models\Audits\Criterions;
use App\Http\Models\Audits\GroupCriterion;
use App\Http\Models\Audits\GroupCriterionList;
use App\Http\Models\Audits\Location;
use App\Http\Models\Audits\Place;
use App\Http\Models\Audits\Units;
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
        $placeCheckList = CriterionList::where('place_id', '=', $id)->first();

        $placeCheckLists = new PlaceCheckLists;
        $placeCheckLists->criterion_lists_id = $placeCheckList->id;
        $placeCheckLists->created_at = date('Y-m-d', time());
        $placeCheckLists->sended = false;
        $placeCheckLists->user_id = $currentUser->id;
        $placeCheckLists->save();

        foreach ($criterionIds as $key => $value) {
            $placeCheckListCriterion = new PlaceCheckListCriterion;
            $placeCheckListCriterion->place_check_lists_id = $placeCheckLists->id;
            $placeCheckListCriterion->criterions_id = $value;
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
            'places' => $currentUser->units()
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();
        $placeCheckList = CriterionList::where('place_id', '=', $id)->first();

        if (!$placeCheckList || $placeCheckList->user_id !== $currentUser->id) {
            return response()->json([
                'errors' => 'error'
            ]);
        }

        $placeCheckList->unit = Units::find($placeCheckList->unit_id);
        $placeCheckList->location = Location::find($placeCheckList->location_id);
        $placeCheckList->place = Place::find($placeCheckList->place_id);
        $placeCheckList->groupCriterion = GroupCriterion::find($placeCheckList->group_criterion_id);
        $groupCriterionList = GroupCriterionList::where('group_criterion_id', '=', $placeCheckList->groupCriterion->id)->get();
        $criterions = [];
        $placeCheckList->checkLists = PlaceCheckLists::where(
            [
                ['criterion_lists_id', '=', $placeCheckList->id],
                ['user_id', '=', $currentUser->id],
            ]
        )->get();

        foreach ($groupCriterionList as $groupCriterion) {
            $criterion = Criterions::find($groupCriterion->criterions_criterion_id);
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
            $placeCheckListCriterion->criterion = Criterions::find($placeCheckListCriterion->criterions_id);
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

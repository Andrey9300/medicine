<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\CriterionList;
use App\Http\Models\Audits\GroupCriterion;
use App\Http\Models\Audits\Location;
use App\Http\Models\Audits\Place;
use App\Http\Models\Audits\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CriterionListController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();
        $userCriterionList = new CriterionList;
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
            $criterionList->unit = Units::find($criterionList->unit_id);
            $criterionList->location = Location::find($criterionList->location_id);
            $criterionList->place = Place::find($criterionList->place_id);
            $criterionList->groupCriterion = GroupCriterion::find($criterionList->user_group_criterion_id);
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

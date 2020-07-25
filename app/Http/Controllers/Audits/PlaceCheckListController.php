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
        $placeCheckLists->save();

        $currentUser->placeCheckLists()->attach($placeCheckLists);

        foreach ($criterionIds as $key => $value) {
            $placeCheckListCriterion = new PlaceCheckListCriterion;
            $placeCheckListCriterion->place_check_lists_id = $placeCheckLists->id;
            $placeCheckListCriterion->criterions_id = $value;
            $placeCheckListCriterion->mark = $marks[$key];
            $placeCheckListCriterion->comment_from_auditor = $comments[$key];
            $placeCheckListCriterion->save();

            $currentUser->placeCheckListCriterion()->attach($placeCheckListCriterion);
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
        $placeCheckList = CriterionList::where('place_id', '=', $id)->first();

        $this->authorize('owner', $placeCheckList);

        $placeCheckLists = PlaceCheckLists::where('criterion_lists_id', '=', $placeCheckList->id)->get();

        if ($placeCheckLists && count($placeCheckLists)) {
            foreach ($placeCheckLists as $checkList) {
                $this->authorize('owner', $checkList);
            }
        }

        $groupCriterion = GroupCriterion::find($placeCheckList->group_criterion_id);

        $this->authorize('owner', $groupCriterion);

        $placeCheckList->unit = Units::find($placeCheckList->unit_id);
        $placeCheckList->location = Location::find($placeCheckList->location_id);
        $placeCheckList->place = Place::find($placeCheckList->place_id);
        $placeCheckList->groupCriterion = $groupCriterion;
        $placeCheckList->checkLists = $placeCheckLists;

        if (!$placeCheckList->groupCriterion) {
            return response()->json([
                'placeCheckList' => $placeCheckList
            ]);
        }

        $groupCriterionList = GroupCriterionList::where('group_criterion_id', '=', $placeCheckList->groupCriterion->id)->get();
        $criterions = [];

        foreach ($groupCriterionList as $groupCriterion) {
            $criterion = Criterions::find($groupCriterion->criterions_criterion_id);
            array_push($criterions, $criterion);
        }
        $placeCheckList->criterions = $criterions;

        return response()->json([
            'placeCheckList' => $placeCheckList
        ]);
    }
    public function showCheckList($id)
    {
        $currentUser = Auth::user();
        $checkList = $currentUser->placeCheckLists()->get()->where('id', $id)->first();

        $this->authorize('owner', $checkList);

        return response()->json([
            'checkList' => $checkList
        ]);
    }

    public function criterions($id)
    {
        $placeCheckListCriterions = PlaceCheckListCriterion::where('place_check_lists_id', $id)->get();

        foreach ($placeCheckListCriterions as $placeCheckListCriterion) {
            $this->authorize('owner', $placeCheckListCriterion);

            $placeCheckListCriterion->criterion = Criterions::find($placeCheckListCriterion->criterions_id);
        }

        return response()->json([
            'placeCheckListCriterions' => $placeCheckListCriterions
        ]);
    }

    public function update(Request $request, $id)
    {
        $placeCheckListCriterionIds = $request->placeCheckListCriterion;
        $marks = $request->mark;
        $commentsFromAuditor = $request->comment_from_auditor;
        $commentsAtAuditor = $request->comment_at_auditor;
        $currentCriterions = PlaceCheckListCriterion::where('place_check_lists_id', '=', $id)->get();

        foreach ($placeCheckListCriterionIds as $key => $value) {
            $criterion = $currentCriterions->find($key);

            $this->authorize('owner', $criterion);

            $criterion->mark = $marks[$key];
            $criterion->comment_from_auditor = $commentsFromAuditor[$key];
            $criterion->comment_at_auditor = $commentsAtAuditor[$key];
            $criterion->save();
        }
    }
    public function finishAudit(Request $request, $id)
    {
        $currentUser = Auth::user();
        $placeCheckLists = $currentUser->placeCheckLists()->get()->where('id', $id)->first();
        $placeCheckLists->sended = true;
        $placeCheckLists->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $place = $currentUser->place($id)->first();
        $place::destroy();
    }
}

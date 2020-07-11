<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\GroupCriterion;
use App\Http\Models\Audits\GroupCriterionList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupCriterionListController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();
        $criterions = $request->criterions;

        if (!$criterions || !$request->group_criterion_name) {
            return null;
        }

        $groupCriterion = GroupCriterion::firstOrCreate([
            'name' => $request->group_criterion_name,
            'user_id' => $currentUser->id
        ]);

        foreach ($criterions as $criterion) {
            GroupCriterionList::firstOrCreate([
                'group_criterion_id' => $groupCriterion->id,
                'criterions_criterion_id' => $criterion,
                'user_id' => $currentUser->id
            ]);
        }
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        $groupCriterionLists = $currentUser->groupCriterionLists()->get();
        $groupCriterionListsUnique = $groupCriterionLists->unique('group_criterion_id');
        $groupName = [];

        foreach ($groupCriterionListsUnique as $groupCriterionList) {
            array_push($groupName, GroupCriterion::find($groupCriterionList->group_criterion_id));
        }

        return response()->json([
            'groupCriterionLists' => $groupName
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();

        return response()->json([
            'groupCriterionList' => $currentUser->groupCriterionList($id)->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $groupCriterion = $currentUser->groupCriterionList($id)->first();
        $groupCriterion->name = $request->name;
        $groupCriterion->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $groupCriterion = $currentUser->groupCriterionList($id)->first();
        $groupCriterion::destroy();
    }
}

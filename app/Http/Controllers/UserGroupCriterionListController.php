<?php

namespace App\Http\Controllers;

use App\Http\Models\UserGroupCriterion;
use App\Http\Models\UserGroupCriterionList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserGroupCriterionListController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();
        $criterions = $request->criterions;

        foreach ($criterions as $criterion) {
            UserGroupCriterionList::firstOrCreate([
                'user_group_criterion_id' => $request->group_criterion_id,
                'user_criterions_criterion_id' => $criterion,
                'user_id' => $currentUser->id
            ]);
        }
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        $groupCriterionLists = $currentUser->groupCriterionLists()->get();
        $groupCriterionListsUnique = $groupCriterionLists->unique('user_group_criterion_id');
        $groupName = [];

        foreach ($groupCriterionListsUnique as $groupCriterionList) {
            array_push($groupName, UserGroupCriterion::find($groupCriterionList->user_group_criterion_id));
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

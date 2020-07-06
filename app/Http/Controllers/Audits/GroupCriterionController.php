<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\GroupCriterion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupCriterionController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $groupCriterion = new GroupCriterion();
        $groupCriterion->name = $request->name;
        $groupCriterion->user_id = $currentUser->id;
        $groupCriterion->save();
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'groupCriterions' => $currentUser->groupCriterions()->get()
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();

        return response()->json([
            'groupCriterion' => $currentUser->groupCriterion($id)->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $groupCriterion = $currentUser->groupCriterion($id)->first();
        $groupCriterion->name = $request->name;
        $groupCriterion->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $groupCriterion = $currentUser->groupCriterion($id)->first();
        $groupCriterion::destroy();
    }
}

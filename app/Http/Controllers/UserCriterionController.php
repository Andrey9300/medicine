<?php

namespace App\Http\Controllers;

use App\Http\Models\UserCriterions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserCriterionController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $criterion = new UserCriterions;
        $criterion->name = $request->name;
        $criterion->user_id = $currentUser->id;
        $criterion->save();
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'criterions' => $currentUser->criterions()->get()
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();

        return response()->json([
            'criterion' => $currentUser->criterion($id)->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $criterion = $currentUser->criterion($id)->first();
        $criterion->name = $request->name;
        $criterion->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $criterion = $currentUser->criterion($id)->first();
        $criterion::destroy();
    }
}

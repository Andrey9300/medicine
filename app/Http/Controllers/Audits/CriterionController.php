<?php

namespace App\Http\Controllers\Audits;

use App\Http\Models\Audits\Criterions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CriterionController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $criterion = new Criterions;
        $criterion->name = $request->name;
        $criterion->save();

        $currentUser->criterions()->attach($criterion);
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
        $criterion = $currentUser->criterions()->get()->where('id', $id)->first();

        return response()->json([
            'criterion' => $criterion
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $criterion = $currentUser->criterions()->get()->where('id', $id)->first();
        $criterion->name = $request->name;
        $criterion->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $criterion = $currentUser->criterions()->get()->where('id', $id)->first();
        $criterion->delete();
    }
}

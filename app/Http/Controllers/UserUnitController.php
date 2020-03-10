<?php

namespace App\Http\Controllers;

use App\Http\Models\UserUnits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserUnitController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $unit = new UserUnits;
        $unit->name = $request->name;
        $unit->user_id = $currentUser->id;
        $unit->save();
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'units' => $currentUser->units()->get()
        ]);
    }

    public function show($id)
    {
        $currentUser = Auth::user();

        return response()->json([
            'unit' => $currentUser->unit($id)->first()
        ]);
    }

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $unit = $currentUser->unit($id)->first();
        $unit->name = $request->name;
        $unit->save();
    }

    public function destroy($id)
    {
        $currentUser = Auth::user();
        $unit = $currentUser->unit($id)->first();
        $unit::destroy();
    }
}

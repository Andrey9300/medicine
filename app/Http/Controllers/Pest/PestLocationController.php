<?php

namespace App\Http\Controllers\Pest;

use App\Http\Models\Pest\PestLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PestLocationController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $pestLocation = new PestLocation;
        $pestLocation->name = $request->name;
        $pestLocation->save();

        $currentUser->pestLocations()->attach($pestLocation);
    }

    public function show($id)
    {
        $pestLocation = PestLocation::find($id);

        $this->authorize('owner', $pestLocation);

        return response()->json([
            'pestLocation' => $pestLocation
        ]);
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'pestLocations' => $currentUser->pestLocations()->get()
        ]);
    }

    public function update(Request $request, $id)
    {
        $pestLocation = PestLocation::find($id);

        $this->authorize('owner', $pestLocation);

        $pestLocation->name = $request->name;
        $pestLocation->save();
    }

    public function destroy($id)
    {
        $pestLocation = PestLocation::find($id);

        $this->authorize('owner', $pestLocation);

        $pestLocation->delete();
    }
}

<?php

namespace App\Http\Controllers\Pest;

use App\Http\Models\Pest\PestUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PestUnitController extends Controller
{
    public function store(Request $request)
    {
        $currentUser = Auth::user();

        $pestUnit = new PestUnit;
        $pestUnit->name = $request->name;
        $pestUnit->manager = $request->manager;
        $pestUnit->check_organization = $request->checkOrganization;
        $pestUnit->user_id = $currentUser->id;
        $files = $request['files'];
        $fileNames = $request['fileNames'];
        $filesArr = [];

        foreach ($files as $key => $value) {
            $filesArr[$key]['name'] = $fileNames[$key];
            $filesArr[$key]['link'] = $value;
        }

        try {
            $pestUnit->files = json_encode($filesArr);
        }catch (\Exception $e){}

        $pestUnit->save();
    }

    public function current()
    {
        $currentUser = Auth::user();
        $pestUnit = PestUnit::where('user_id', '=', $currentUser->id)->first();

        $pestUnit->files = json_decode($pestUnit->files);

        return response()->json([
            'pestUnit' => $pestUnit
        ]);
    }

    public function update(Request $request)
    {
        $currentUser = Auth::user();
        $pestUnit = PestUnit::where('user_id', '=', $currentUser->id)->first();

        $pestUnit->name = $request->name;
        $pestUnit->manager = $request->manager;
        $pestUnit->check_organization = $request->checkOrganization;
        $pestUnit->save();
    }

    public function destroy($id)
    {
        $pestUnit = PestUnit::find($id);

        $this->authorize('owner', $pestUnit);

        $pestUnit->delete();
    }
}

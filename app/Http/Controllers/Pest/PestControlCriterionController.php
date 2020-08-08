<?php

namespace App\Http\Controllers\Pest;

use App\Http\Models\Pest\PestControlCriterion;
use Illuminate\Http\Request;

class PestControlCriterionController extends Controller
{
    public function store(Request $request)
    {
        $pestControlCriterion = new PestControlCriterion;
        $pestControlCriterion->name = $request->name;
        $pestControlCriterion->id =  $request->id;
        $pestControlCriterion->save();
    }

    public function show($id)
    {
        $pestControlCriterion = PestControlCriterion::find($id);

        $this->authorize('owner', $pestControlCriterion);

        return response()->json([
            'pestControlCriterion' => $pestControlCriterion
        ]);
    }

    public function showAll()
    {
        $currentUser = Auth::user();

        return response()->json([
            'pestControlCriterions' => $currentUser->pestControlCriterions()->get()
        ]);
    }

    public function update(Request $request, $id)
    {
        $pestControlCriterion = PestControlCriterion::find($id);

        $this->authorize('owner', $pestControlCriterion);

        $pestControlCriterion->name = $request->name;
        $pestControlCriterion->save();
    }

    public function destroy($id)
    {
        $pestControlCriterion = PestControlCriterion::find($id);

        $this->authorize('owner', $pestControlCriterion);

        $pestControlCriterion->delete();
    }
}

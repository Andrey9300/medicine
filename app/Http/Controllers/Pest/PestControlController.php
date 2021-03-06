<?php

namespace App\Http\Controllers\Pest;

use App\Http\Models\Pest\PestControl;
use App\Http\Models\Pest\PestControlCriterion;
use App\Http\Models\Pest\PestLocation;
use App\Http\Models\Pest\PestPlace;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PestControlController extends Controller
{
    public function store(Request $request)
    {
        $pestControl = new PestControl;
        $pestControl->location_id = $request->locationId;
        $pestControl->comment = $request->comment;
        $pestControl->created_at = Carbon::now()->format('Y-m-d');
        $pestControl->save();

        $placeIds = $request->placeId;
        $checks = $request->checked;
        $counts = $request->count;
        $changes = is_null($request->changed) ? [] : $request->changed;

        foreach ($placeIds as $key => $value) {
            $pestControlCriterion = new PestControlCriterion;

            $pestControlCriterion->checked = $checks[$key];
            $pestControlCriterion->count = $counts[$key];
            $pestControlCriterion->changed = array_key_exists($key, $changes) ? true : false;
            $pestControlCriterion->place_id = $placeIds[$key];
            $pestControlCriterion->pest_control_id = $pestControl->id;
            $pestControlCriterion->save();
        }
    }

    public function show($id)
    {
        $pestControl = PestControl::find($id);
        $pestLocation = PestLocation::find($pestControl->location_id);

        $this->authorize('owner', $pestLocation);

        $pestControlCriteria = PestControlCriterion::where('pest_control_id', '=', $pestControl->id)->get();

        foreach ($pestControlCriteria as $pestControlCriterion) {
            $pestControlCriterion->place = PestPlace::find($pestControlCriterion->place_id);
        }

        return response()->json([
            'pestControl' => $pestControl,
            'pestControlCriteria' => $pestControlCriteria
        ]);
    }

    public function showAllForLocation($id)
    {
        $pestLocation = PestLocation::find($id);

        $this->authorize('owner', $pestLocation);

        $pestControls = PestControl::where('location_id', '=', $id)->get();

        return response()->json([
            'pestControls' => $pestControls
        ]);
    }

    public function update(Request $request, $id)
    {
        $pestControl = PestControl::find($id);
        $pestLocation = PestLocation::find($pestControl->location_id);

        $this->authorize('owner', $pestLocation);

        $pestControl->comment = $request->comment;
        $pestControl->save();

        $pestControlCriterionIds = $request->pestControlCriterionId;
        $placeIds = $request->placeId;
        $checks = $request->checked;
        $counts = $request->count;
        $changes = is_null($request->changed) ? [] : $request->changed;

        foreach ($pestControlCriterionIds as $key => $value) {
            $pestControlCriterion = PestControlCriterion::find($value);

            $pestControlCriterion->checked = $checks[$key];
            $pestControlCriterion->count = $counts[$key];
            $pestControlCriterion->changed = array_key_exists($key, $changes) ? true : false;
            $pestControlCriterion->place_id = $placeIds[$key];
            $pestControlCriterion->pest_control_id = $pestControl->id;
            $pestControlCriterion->save();
        }
    }

    public function destroy($id)
    {
        $pestControl = PestControl::find($id);
        $pestLocation = PestLocation::find($pestControl->location_id);

        $this->authorize('owner', $pestLocation);

        $pestControl->delete();
    }
}

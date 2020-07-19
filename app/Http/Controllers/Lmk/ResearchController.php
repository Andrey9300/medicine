<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\Research;
use App\Http\Models\Lmk\ResearchCategory;
use App\Http\Models\Lmk\ResearchPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResearchController extends Controller
{
    public function store(Request $request)
    {
        $research = new Research;
        $research->name = $request->name;
        $research->period_id = $request->period_id;
        $research->save();
    }

    public function showAll()
    {
        $researches = ResearchCategory::all();

        foreach ($researches as $research) {
            $research->category;
            $research->research;
        }

        return response()->json([
            'researches' => $researches
        ]);
    }

    public function show($id)
    {
        $research = Research::find($id);
        $research->researchPeriod;

        return response()->json([
            'research' => $research,
            'periods' => ResearchPeriod::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $research_new = $request->all();
        $research = Research::find($id);
        $research->name = $research_new['name'];
        $research->period_id = $research_new['period_id'];
        $research->save();
    }

    public function destroy($id)
    {
        Research::destroy($id);
    }
}

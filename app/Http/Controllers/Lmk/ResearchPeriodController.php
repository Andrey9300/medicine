<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\ResearchPeriod;

class ResearchPeriodController extends Controller
{
    public function showAll()
    {
        return response()->json([
            'research_periods' => ResearchPeriod::all()
        ]);
    }
}

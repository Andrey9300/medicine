<?php

namespace App\Http\Controllers;

use App\Http\Models\ResearchPeriod;

class ResearchPeriodController extends Controller
{
    public function showAll()
    {
        return response()->json([
            'research_periods' => ResearchPeriod::all()
        ]);
    }
}

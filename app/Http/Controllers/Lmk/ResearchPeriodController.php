<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\ResearchPeriod;

class ResearchPeriodController extends Controller
{
    /**
     * Вывести все периоды исследований
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        return response()->json([
            'research_periods' => ResearchPeriod::all()
        ]);
    }
}

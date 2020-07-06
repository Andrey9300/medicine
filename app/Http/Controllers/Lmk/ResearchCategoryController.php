<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\ResearchCategory;
use Illuminate\Http\Request;

class ResearchCategoryController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $researchCategory = ResearchCategory::all();
        $researchCategory->category;
        $researchCategory->research;
    }
}

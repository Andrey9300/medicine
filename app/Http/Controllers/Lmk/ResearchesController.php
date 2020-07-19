<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\ResearchCategory;
use App\Http\Models\Lmk\Researches;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResearchesController extends Controller
{
    public function store(Request $request)
    {
        $researches = $request->research;
        $user = Auth::user();
        $this->authorize('isAdmin', $user);
        $Researches = $user->researches;

        foreach ($Researches as $userResearch) {
            if (!in_array($userResearch->pivot->research_categories_id, $researches)) {
                Researches::destroy($userResearch->pivot->id);
            }
        }

        foreach ($researches as $research) {
            Researches::firstOrCreate([
                'research_categories_id' => $research,
                'user_id' => $user->id
            ]);
        }
    }

    public function showAll()
    {
        $userAdmin = IndexController::findAdmin();
        $categoriesId = [];

        foreach ($userAdmin->employees as $employee) {
            array_push($categoriesId, $employee->category_id);
        }

        $categoriesId = array_unique($categoriesId);
        $researches = ResearchCategory::all();
        $Researches = $userAdmin->researches;

        foreach ($researches as $research) {
            foreach ($Researches as $userReseach) {
                if ($userReseach->pivot->research_categories_id === $research->id) {
                    $research->check = true;
                }
            }
            $research->category;
            $research->research;
        }

        return response()->json([
            'Researches' => $researches
        ]);
    }
}

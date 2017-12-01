<?php

namespace App\Http\Controllers;

use App\Http\Models\ResearchCategory;
use App\Http\Models\UserResearches;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserResearchesController extends Controller
{
    /**
     * Сохранить исследования выбранные админом
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $researches = $request->research;
        $user = Auth::user();
        $userResearches = $user->researches;

        foreach ($userResearches as $userResearch) {
            if (!in_array($userResearch->pivot->research_categories_id, $researches)) {
                UserResearches::destroy($userResearch->pivot->id);
            }
        }

        foreach ($researches as $research) {

            UserResearches::firstOrCreate([
                'research_categories_id' => $research,
                'user_id' => $user->id
            ]);
        }
    }

    /**
     * Вывести все исследования, категории берем из организаций.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $user = Auth::user();
        $categoriesId = [];

        foreach ($user->organizations as $organization) {
            array_push($categoriesId, $organization->category_id);
        }

        $categoriesId = array_unique($categoriesId);
        $researches = ResearchCategory::whereIn('category_id', $categoriesId)->get();
        $userReseaches = $user->researches;

        foreach ($researches as $research) {
            foreach ($userReseaches as $userReseach) {
                if ($userReseach->pivot->research_categories_id === $research->id) {
                    $research->check = true;
                }
            }
            $research->category;
            $research->research;
        }

        return response()->json([
            'userResearches' => $researches
        ]);
    }
}

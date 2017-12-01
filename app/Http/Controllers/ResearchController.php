<?php

namespace App\Http\Controllers;

use App\Http\Models\Research;
use App\Http\Models\ResearchCategory;
use App\Http\Models\ResearchPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResearchController extends Controller
{
    /**
     * Создать исследование
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $research = new Research;
        $research->name = $request->name;
        $research->period_id = $request->period_id;
        $research->save();
    }

    /**
     * Вывести исследования по категориям
     *
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Показать данные исследования
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $research = Research::find($id);
        $research->researchPeriod;

        return response()->json([
            'research' => $research,
            'periods' => ResearchPeriod::all()
        ]);
    }

    /**
     * Обновить исследование
     *
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function update(Request $request, $id)
    {
        $research_new = $request->all();
        $research = Research::find($id);
        $research->name = $research_new['name'];
        $research->period_id = $research_new['period_id'];
        $research->save();
    }

    /**
     * Удалить исследование
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        Research::destroy($id);
    }
}

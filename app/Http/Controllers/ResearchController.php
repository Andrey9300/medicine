<?php

namespace App\Http\Controllers;

use App\Http\Models\Organization;
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
     * Вывести исследования
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $researches = Research::all();

        foreach ($researches as $research){
            $research->researchPeriod;
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

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showHospitals($id){
        $research = Research::find($id);

        return response()->json([
            'research_hospitals' => $research->hospitals
        ]);
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function onCategories(){
        $user = Auth::user();
        $categories = $user->organizations()->get()->unique('category_id');
        $researches = [];
        foreach ($categories as $category) {
            array_push($researches, ResearchCategory::where('category_id', $category->category_id)->get());
        }
        foreach ($researches as $research) {
            // var_dump($research->);
        }

        //foreach ($researches as $research) {
        //    var_dump( $research->research->name);
        //}

        //var_dump($user->organizations()->distinct('category_id')->get());

        //ResearchCategory::all();

        return response()->json([
            'research_hospitals' => 1
        ]);
    }
}

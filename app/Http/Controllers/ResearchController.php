<?php

namespace App\Http\Controllers;

use App\Http\Models\Research;
use Illuminate\Http\Request;

class ResearchController extends Controller
{
    /**
     * Создать исследование
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function create(Request $request)
    {
        $research = new Research;
        $research->name = $request->name;
        $research->period = $request->period;
        $research->save();
    }

    /**
     * Вывести исследования
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        return response()->json([
            'researches' => Research::all()
        ]);
    }

    /**
     * Вывести карточку исследования
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json([
            'research' => Research::find($id)
        ]);
    }

    /**
     * Вывести карточку редактирования исследования
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        return response()->json([
            'research' => Research::find($id)
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
        $research->period = $research_new['period'];
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
}

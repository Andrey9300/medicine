<?php

namespace App\Http\Controllers;

use App\Http\Models\Hospital;
use App\Http\Models\Research;
use Illuminate\Http\Request;

class HospitalController extends Controller
{
    /**
     * Создать организацию
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function create(Request $request)
    {
        $hospital = new Hospital;
        $hospital->name = $request->name;
        $hospital->address = $request->address;
        $hospital->shedule = $request->shedule;
        $hospital->photo_map = $request->photo_map;
        $hospital->phone = $request->phone;
        $hospital->save();
    }

    /**
     * Вывести организации
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        return response()->json([
            'hospitals' => Hospital::all()
        ]);
    }

    /**
     * Отдать данные организации
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json([
            'hospital' => Hospital::find($id)
        ]);
    }

    /**
     * Обновить организацию
     *
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function update(Request $request, $id)
    {
        $hospital_new = $request->all();
        $hospital = Hospital::find($id);
        $hospital->name = $hospital_new['name'];
        $hospital->address = $hospital_new['address'];
        $hospital->shedule = $hospital_new['shedule'];
        $hospital->photo_map = $hospital_new['photo_map'];
        $hospital->phone = $hospital_new['phone'];
        $hospital->save();
    }

    /**
     * Удалить организацию
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        Hospital::destroy($id);
    }

    /**
     * Исследования медицинских учреждений
     */

    /**
     * Создать исследование для организации
     * @param Request $request
     * @param         $id_hospital
     */
    public function createResearch(Request $request, $id_hospital){
        $hospital = Hospital::find($id_hospital);
        $hospital->researches()->attach($request->name, ['price' => $request->price]);
    }

    /**
     * Редактировать исследование для организации
     * @param $id_hospital
     * @param $id_research
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function editResearch($id_hospital, $id_research){
        $hospital = Hospital::find($id_hospital);

        return response()->json([
            'hospital_research' => $hospital->researches->find($id_research)
        ]);
    }

    /**
     * Удалить исследование для организации
     * @param $id_hospital
     * @param $id_research
     */
    public function destroyResearch($id_hospital, $id_research){
        $hospital = Hospital::find($id_hospital);
        $hospital->researches()->detach($id_research);
    }

    /**
     * Обновить исследование для организации
     * @param Request $request
     * @param         $id_hospital
     * @param         $id_research
     */
    public function updateResearch(Request $request, $id_hospital, $id_research){
        Hospital::find($id_hospital)->researches()->updateExistingPivot($id_research, ['price' => $request['price']]);
    }

    /**
     * Показать исследования для организации
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeResearches($id){
        $hospital = Hospital::find($id);

        return response()->json([
            'hospital_researches' => $hospital->researches
        ]);
    }

}

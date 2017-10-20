<?php

namespace App\Http\Controllers;

use App\Http\Models\Hospital;
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
     * Вывести карточку организации
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
     * Вывести карточку редактирования организации
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
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

    public function showResearches($id){
        $hospital = Hospital::find($id);

        return response()->json([
            'hospital_researches' => $hospital->researches
        ]);
    }
}

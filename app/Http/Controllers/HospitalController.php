<?php

namespace App\Http\Controllers;

use App\Http\Models\Hospital;
use App\Http\Models\Region;
use App\Http\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HospitalController extends Controller
{
    /**
     * Создать медицинскую организацию
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function create(Request $request)
    {
        $this->authorize('create', Hospital::class);
        $user = Auth::user();
        $hospital = new Hospital;
        $hospital->name = $request->name;
        $hospital->address = $request->address;
        $hospital->shedule = $request->shedule;
        $hospital->photo_map = $request->photo_map;
        $hospital->phone = $request->phone;
        $hospital->region_id = $request->region_id;
        $hospital->user_id = $user->id;
        $hospital->save();
    }

    /**
     * Вывести медицинские организации
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        $user = Auth::user();

        return response()->json([
            'hospitals' => $user->hospitals
        ]);
    }

    /**
     * Показать медицинскую организацию
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $hospital = Hospital::find($id);
        $this->authorize('owner', $hospital);
        $hospital->region;

        $this->authorize('show', $hospital);

        return response()->json([
            'hospital' => $hospital,
            'regions' => Region::all()
        ]);
    }

    /**
     * Обновить медицинскиую организацию
     *
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function update(Request $request, $id)
    {
        $hospital_new = $request->all();
        $hospital = Hospital::find($id);
        $this->authorize('owner', $hospital);
        $hospital->name = $hospital_new['name'];
        $hospital->address = $hospital_new['address'];
        $hospital->shedule = $hospital_new['shedule'];
        $hospital->photo_map = $hospital_new['photo_map'];
        $hospital->phone = $hospital_new['phone'];
        $hospital->region_id = $hospital_new['region_id'];
        $hospital->save();
    }

    /**
     * Удалить медицинскиую организацию
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        $hospital = Hospital::find($id);
        $this->authorize('owner', $hospital);
        $hospital->destroy($id);
    }

    /**
     * Исследования медицинских учреждений
     */


}

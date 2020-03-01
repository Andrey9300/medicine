<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Http\Models\Hospital;
use App\Http\Models\HospitalResearch;
use App\Http\Requests\StoreHospital;
use App\Http\Requests\UpdateHospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HospitalController extends Controller
{
    /**
     * Создать медицинскую организацию
     *
     * @param StoreHospital $request
     * @return void
     */
    public function store(StoreHospital $request)
    {
        $photo_map = null;

        if ($request->file('photo_map')) {
            $photo_map = $request->file('photo_map')->store('/images');
        }

        $user = Auth::user();
        $hospital = new Hospital;
        $hospital->name = $request->name;
        $hospital->address = $request->address;
        $hospital->head_fio = $request->head_fio;
        $hospital->shedule = $request->shedule;
        $hospital->photo_map = $photo_map;
        $hospital->phone = $request->phone;
        $hospital->user_id = $user->id;
        $hospital->save();
    }

    /**
     * Вывести медицинские организации
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $userAdmin = IndexController::findAdmin();

        $hospitals = $userAdmin->hospitals;

        foreach ($hospitals as $hospital) {
            if (Storage::disk('local')->exists($hospital->photo_map)) {
                $hospital->photo_map = Storage::url($hospital->photo_map);
            }
        }

        return response()->json([
            'hospitals' => $userAdmin->hospitals
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
        $userAdmin = IndexController::findAdmin();
        $hospital = $userAdmin->hospitals->find($id);

        if (Storage::disk('local')->exists($hospital->photo_map)) {
            $hospital->photo_map = Storage::url($hospital->photo_map);
        }

        return response()->json([
            'hospital' => $hospital
        ]);
    }

    /**
     * Обновить медицинскиую организацию
     *
     * @param UpdateHospital $request
     * @param                $id
     */
    public function update(UpdateHospital $request, $id)
    {
        $hospital_new = $request->all();
        $hospital = Hospital::find($id);
        $path = $hospital->photo_map;

        if (!is_null($request->file('photo_map'))) {
            $path = $request->file('photo_map')->store('/images');
        }

        $hospital->name = $hospital_new['name'];
        $hospital->address = $hospital_new['address'];
        $hospital->head_fio = $hospital_new['head_fio'];
        $hospital->shedule = $hospital_new['shedule'];
        $hospital->photo_map = $path;
        $hospital->phone = $hospital_new['phone'];
        $hospital->save();
    }

    /**
     * Удалить медицинскиую организацию
     *
     * @param int $id
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $hospital = $user->hospitals->find($id);
        $this->authorize('isAdminAndOwner', $hospital);
        $hospital->destroy($id);
    }

    /**
     * Цены на исследования
     *
     * @param $id - hospital_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function researches($id) {
        $userAdmin = IndexController::findAdmin();
        $userResearches = $userAdmin->researches;

        foreach ($userResearches as $research) {
            $hospitalResearch = HospitalResearch::firstOrCreate(
                ['user_researches_id' => $research->pivot->id, 'hospital_id' => $id]
            );

            $research->category;
            $research->research;
            $research->price = $hospitalResearch->price;
        }

        return response()->json([
            'hospitalResearches' => $userResearches
        ]);
    }

    /**
     * Обновить или сохранить цены на исследований
     *
     * @param Request $request
     * @param         $id
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function researchesStore(Request $request, $id) {
        $user = Auth::user();
        $this->authorize('isAdmin', $user);
        $hospitalResearches = $request->hospitalResearch;

        foreach ($hospitalResearches as $key => $value) {
            HospitalResearch::updateOrCreate(
                ['user_researches_id' => $key, 'hospital_id' => $id],
                ['price' => $value]
            );
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Models\Research;
use App\User;
use App\Http\Models\Organization;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{

    /**
     * @param $user
     */
    // TODO вынести в common
    public static function checkMedicalResearch($user){
        // TODO period from bd
        $options_ended = $user->researches_ended = [];
        $options_expired = $user->researches_expired = [];

        $researches = Research::all();
        foreach ($researches as $key => $research) {
            foreach ($user->researches as $user_research) {
                if ($research->id === $user_research->id) {
                    switch ($user_research->period) {
                        case -1:
                            $employment_date = Carbon::parse($user->date_employment);
                            $research_date = Carbon::parse($user_research->pivot->date);
                            $research_date->addMonths(1);
                            $diffDatesResearch = $employment_date->diffInDays($research_date, false);

                            if ($diffDatesResearch < 0){
                                array_push($options_expired, $user_research);
                            }
                            break;
                        case 1:
                            if (is_null($user_research->pivot->date)){
                                array_push($options, $user_research);
                            }
                            break;
                        case 365:
                            $research_date = Carbon::parse($user_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 365) {
                                array_push($options_ended, $user_research);
                            } else if ($diffDatesResearch > 335){
                                array_push($options_expired, $user_research);
                            }
                            break;
                        case 730:
                            $research_date = Carbon::parse($user_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 730) {
                                array_push($options_ended, $user_research);
                            } else if ($diffDatesResearch > 700){
                                array_push($options_expired, $user_research);
                            }
                            break;
                        case 1827:
                            $research_date = Carbon::parse($user_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 1827) {
                                array_push($options_ended, $user_research);
                            } else if ($diffDatesResearch > 1797){
                                array_push($options_expired, $user_research);
                            }
                            break;
                        case 3653:
                            $research_date = Carbon::parse($user_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 3653) {
                                array_push($options_ended, $user_research);
                            } else if ($diffDatesResearch > 3623){
                                array_push($options_expired, $user_research);
                            }
                            break;
                    }
                    unset($researches[$key]);
                }
            }
        }

        // добавляем не заполненные исследования как просроченные
        foreach ($researches as $key => $research) {
            array_push($options_expired, $research);
        }

        $user->researches_ended = $options_ended;
        $user->researches_expired = $options_expired;

        return $user;
    }

    /**
     * Создать организацию
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function create(Request $request)
    {
        $organization = new Organization;
        $organization->name = $request->name;
        $organization->address = $request->address;
        $organization->legal_entity = $request->legal_entity;
        $organization->head_fio = $request->head_fio;
        $organization->head_email = $request->head_email;
        $organization->regional_email = $request->regional_email;
        $organization->chef_email = $request->chef_email;
        $organization->phone = $request->phone;
        $organization->is_certification = $request->is_certification;
        $organization->save();
    }

    /**
     * Вывести организации
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        return response()->json([
            'organizations' => Organization::all()
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
            'organization' => Organization::find($id)
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
        $organization_new = $request->all();
        $organization = Organization::find($id);
        $organization->name = $organization_new['name'];
        $organization->address = $organization_new['address'];
        $organization->legal_entity = $organization_new['legal_entity'];
        $organization->head_fio = $organization_new['head_fio'];
        $organization->head_email = $organization_new['head_email'];
        $organization->regional_email = $organization_new['regional_email'];
        $organization->chef_email = $organization_new['chef_email'];
        $organization->phone = $organization_new['phone'];
        $organization->is_certification = $organization_new['is_certification'];
        $organization->save();
    }

    /**
     * Удалить организацию
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        Organization::destroy($id);
    }

    /**
     * Сотрудники объекта
     */

    /**
     * Показать исследования для организации
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeUsers($id){
        $organization = Organization::find($id);
        $users = [];
        foreach ($organization->users as $user) {
            array_push($users, $this->checkMedicalResearch($user));
        }

        return response()->json([
            'organization_users' => $users
        ]);
    }
}

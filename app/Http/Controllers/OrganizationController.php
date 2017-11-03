<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
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
        $research = $this->checkMedicalResearch($organization->users);

        return response()->json([
            'organization_users' => $organization->users
        ]);
        //return response()->json([
        //    'organization_users' => $research
        //]);
    }

    /**
     * @param $users
     */
    public function checkMedicalResearch($users){
        $user_current = [];
        foreach ($users as $user) {
            //$user_current = User::find($user->id);
            array_push($user_current, $user->researches->find(1));
        }
        return $user_current;
    }
}

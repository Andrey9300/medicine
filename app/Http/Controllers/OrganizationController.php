<?php

namespace App\Http\Controllers;

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
     * Вывести карточку организации
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
     * Вывести карточку редактирования организации
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
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
}

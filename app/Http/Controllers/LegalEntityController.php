<?php

namespace App\Http\Controllers;

use App\Http\Models\LegalEntity;
use App\Http\Requests\StoreLegalEntity;
use App\Http\Requests\UpdateLegalEntity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LegalEntityController extends Controller
{
    /**
     * Создать юридическое лицо
     *
     * @param StoreLegalEntity $request
     */
    public function store(StoreLegalEntity $request)
    {
        $user = Auth::user();
        // TODO заменить на fill
        $legal_entity = new LegalEntity;
        $legal_entity->name = $request->name;
        $legal_entity->address = $request->address;
        $legal_entity->site = $request->site;
        $legal_entity->phone = $request->phone;
        $legal_entity->inn = $request->inn;
        $legal_entity->user_id = $user->id;
        $legal_entity->save();
    }

    /**
     * Вывести юридические лица
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function showAll()
    {
        $userAdmin = IndexController::findAdmin();
        $this->authorize('isAdmin', $userAdmin);

        return response()->json([
            'legalEntities' => $userAdmin->legalEntities
        ]);
    }

    /**
     * Показать юридическое лицо
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $userAdmin = IndexController::findAdmin();
        $legalEntity = $userAdmin->legalEntities->find($id);
        $this->authorize('isAdminAndOwner', $legalEntity);

        return response()->json([
            'legalEntity' => $legalEntity
        ]);
    }

    /**
     * Общая информация по юридическому лицу для admin
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function commonInfo($id) {
        $user = Auth::user();
        $legalEntity = $user->legalEntities->find($id);
        $this->authorize('isAdminAndOwner', $legalEntity);
        $organizations = $user->organizations->where('legal_entity_id', '=', $id);

        $employees = [];
        $employeesResearchesEnds = [];
        $employeesResearchesExpired = [];

        foreach ($organizations as $organization) {
            $employees_current = $organization->employees;
            $organization->medicalResearchesProblem = false;

            foreach ($employees_current as $employee) {
                OrganizationController::checkMedicalResearch($employee);
                if (count($employee->researches_ends)) {
                    $employeesResearchesEnds[] = $employee;
                    $organization->medicalResearchesProblem = true;
                } else if (count($employee->researches_expired)) {
                    $employeesResearchesExpired[] = $employee;
                    $organization->medicalResearchesProblem = true;
                }
                $employees[] = $employee;
            }
        }

        $countOrganizationsWithResearchProblems = $organizations->reduce(function ($carry, $item) {
            if ($item->medicalResearchesProblem) {
                return $carry + 1;
            }
        });

        return response()->json([
            'user' => $user,
            'legalEntity' => $legalEntity,
            'organizations' => $organizations,
            'countOrganizationsWithResearchProblems' => $countOrganizationsWithResearchProblems,
            'hospitals' => $user->hospitals,
            'employees' => $employees,
            'employeesResearchesEnds' => $employeesResearchesEnds,
            'employeesResearchesExpired' => $employeesResearchesExpired,
        ]);
    }

    /**
     * Обновить юридическое лицо
     *
     * @param UpdateLegalEntity $request
     * @param                   $id
     * @return void
     */
    public function update(UpdateLegalEntity $request, $id)
    {
        $legal_entity_new = $request->all();
        $legal_entity = LegalEntity::find($id);
        $legal_entity->name = $legal_entity_new['name'];
        $legal_entity->address = $legal_entity_new['address'];
        $legal_entity->site = $legal_entity_new['site'];
        $legal_entity->phone = $legal_entity_new['phone'];
        $legal_entity->inn = $legal_entity_new['inn'];
        $legal_entity->save();
    }

    /**
     * Удалить юридическое лицо
     *
     * @param int $id
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id)
    {
        $legal_entity = LegalEntity::find($id);
        $this->authorize('isAdminAndOwner', $legal_entity);
        $legal_entity->destroy($id);
    }
}

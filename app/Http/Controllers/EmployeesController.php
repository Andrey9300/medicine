<?php

namespace App\Http\Controllers;

use App\Http\Models\EmployeeResearch;
use App\Http\Models\Organization;
use App\Http\Models\Research;
use App\Http\Models\Employee;
use App\Http\Models\ResearchCategory;
use App\Http\Requests\StoreEmployee;
use App\Http\Requests\UpdateEmployee;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EmployeesController extends Controller
{
    /**
     * Создать сотрудника
     *
     * @param StoreEmployee $request
     * @return void
     */
    public function store(StoreEmployee $request)
    {
        $userAdmin = Auth::user(); // только админ
        $employee = new Employee;
        $employee->fio = $request->fio;
        $employee->date_birthday = $request->date_birthday;
        $employee->date_employment = $request->date_employment;
        $employee->medical_book = $request->medical_book;
        $employee->user_id = $userAdmin->id;
        $employee->organization_name = $request->organization_name;
        $employee->save();
    }

    /**
     * Вывести сотрудников всех организаций начальника качества
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll(Request $request)
    {
        $user = Auth::user();
        $userAdmin = IndexController::findAdmin();
        $organizations_name = [];

        if ($request->legalEntityId) {
            $organizations = $user->organizations()->where('legal_entity_id', '=', $request->legalEntityId)->get();
        } else {
            $organizations = $user->organizations;
        }

        foreach($organizations as $organization){
            array_push($organizations_name, $organization->name);
        }

        // можно через $user->employees
        $employees = Employee::whereIn('organization_name', $organizations_name)
            ->get();
        $deleted = Employee::whereIn('organization_name', $organizations_name)
            ->onlyTrashed()
            ->get();
        $withoutOrganization = DB::table('employees')
            ->where('user_id', '=', $userAdmin->id)
            ->whereNull('organization_name')
            ->get();

        foreach ($employees as $employee) {
            OrganizationController::checkMedicalResearch($employee);
        }
        foreach ($deleted as $employee) {
            OrganizationController::checkMedicalResearch($employee);
        }
        foreach ($withoutOrganization as $employee) {
            OrganizationController::checkMedicalResearch($employee);
        }

        return response()->json([
            'employees' => $employees,
            'deleted' => $deleted,
            'withoutOrganization' => $withoutOrganization
        ]);
    }

    /**
     * Получить данные сотрудника
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $employee = Employee::withTrashed()->where('id', $id)->first();
        $organization = $employee->organization;
        OrganizationController::checkMedicalResearch($employee);
        $employee->legal_entity = $organization->legal_entity->name;
        $head_exist = false;

        // устанавливаем фио руководителя
        // если есть head берём его, если нет, то админа
        foreach ($organization->users as $user) {
            if ($user->role === 'head') {
                if (!is_null($user->fio)) {
                    $organization->head_fio = $user->fio;
                    $head_exist = true;
                }
            }
        }

        if (!$head_exist) {
            $organization->head_fio = $organization->users[0]->fio;
        }

        $employment_date = Carbon::parse($employee->date_employment);
        $diffDatesResearch = $employment_date->diffInMonths(Carbon::now());

        if ($diffDatesResearch < 3) {
            $employee->pay = true; // сотрудник платит наличными
        } else {
            $employee->pay = false; // платит орагнизация
        }

        return response()->json([
            'employee' => $employee
        ]);
    }

    /**
     * Обновить сотрудника
     *
     * @param int $id
     * @param  UpdateEmployee $request
     * @return void
     */
    public function update(UpdateEmployee $request, $id)
    {
        $employee = Employee::find($id);
        $employee->fio = $request->fio;
        $employee->date_birthday = $request->date_birthday;
        $employee->date_employment = $request->date_employment;
        $employee->medical_book = $request->medical_book;
        $employee->organization_name = $request->organization_name;
        $employee->save();
    }

    /**
     * Мягкое удаление сотрудника
     *
     * @param int $id
     * @return void
     */
    public function softDelete($id)
    {
        $userAdmin = IndexController::findAdmin();
        $employee = $userAdmin->employees->find($id);
        $employee->delete();
    }

    /**
     * Полное удаление сотрудника
     *
     * @param int $id
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function forceDelete($id)
    {
        $userAdmin = IndexController::findAdmin();
        $employee = $userAdmin->employees->find($id);
        $this->authorize('isAdminAndOwner', $employee);
        $employee->forceDelete();
    }

    /**
     * Исследования сотрудника
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function researches($id) {
        $employee = Employee::find($id);
        $employeeCategoryId = $employee->organization->category_id;
        $userAdmin = IndexController::findAdmin();
        $userResearches = $userAdmin->researches;
        $employeeResearches = [];

        foreach ($userResearches as $research) {
            $employeeResearch = EmployeeResearch::firstOrCreate(
                ['user_researches_id' => $research->pivot->id, 'employee_id' => $id]
            );
            $researchCategory = ResearchCategory::find($research->id);

            if ($researchCategory->category_id === $employeeCategoryId) {
                $research->category;
                $research->research;
                $research->date = $employeeResearch->date;
                $employeeResearches[] = $research;
            }
        }

        return response()->json([
            'employeeResearches' => $employeeResearches
        ]);
    }

    /**
     * Обновить или сохранить дату исследований сотрудника
     *
     * @param Request $request
     * @param         $id
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function researchesStore(Request $request, $id) {
        $user = Auth::user();
        //$this->authorize('isAdmin', $user);
        $employeeResearches = $request->employeeResearch;

        foreach ($employeeResearches as $key => $value) {
            EmployeeResearch::updateOrCreate(
                ['user_researches_id' => $key, 'employee_id' => $id],
                ['date' => $value]
            );
        }
    }
}

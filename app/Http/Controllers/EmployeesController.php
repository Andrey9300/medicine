<?php

namespace App\Http\Controllers;

use App\Http\Models\Organization;
use App\Http\Models\Research;
use App\Http\Models\Employee;
use App\Http\Requests\StoreEmployee;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EmployeesController extends Controller
{
    /**
     * Создать сотрудника
     *
     * @param  \Illuminate\Http\Request $request
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
    public function showAll()
    {
        $user = Auth::user();
        $organizations_name = [];
        foreach($user->organizations as $organization){
            array_push($organizations_name, $organization->name);
        }

        $employees = Employee::whereIn('organization_name', $organizations_name)
            ->get();
        $deleted = Employee::whereIn('organization_name', $organizations_name)
            ->onlyTrashed()
            ->get();
        $withoutOrganization = DB::table('employees')
            ->where('user_id', '=', $user->id)
            ->whereNull('organization_name')
            ->get();

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
        $employee->organization;

        //$this->authorize('owner', $employee->organization);
        /*$employee->organization;
        $employee = OrganizationController::checkMedicalResearch($employee);

        $employment_date = Carbon::parse($employee->date_employment);
        $diffDatesResearch = $employment_date->diffInMonths(Carbon::now());

        if ($diffDatesResearch < 3) {
            $employee->pay = true; // сотрудник платит наличными
        } else {
            $employee->pay = false; // платит орагнизация
        }*/

        return response()->json([
            'employee' => $employee
        ]);
    }

    /**
     * Обновить сотрудника
     *
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        //$employee->fio = $request->fio;
        //$employee->date_birthday = $request->date_birthday;
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
        // TODO проверку прав
        $employee = Employee::find($id);
        $employee->delete();
    }

    /**
     * Полное удаление сотрудника
     *
     * @param int $id
     * @return void
     */
    public function forceDelete($id)
    {
        $employee = Employee::onlyTrashed()
            ->where('id', $id)
            ->first();
        $this->authorize('isAdminAndOwner', $employee);
        $employee->forceDelete();
    }





    /**
     * Исследования сотрудников
     */

    public function createResearch(Request $request, $id_employee){
        $employee = Employee::find($id_employee);
        $employee->researches()->attach($request->name, ['date' => $request->date]);
    }

    public function editResearch($id_employee, $id_research){
        $employee = Employee::find($id_employee);

        return response()->json([
            'employee_research' => $employee->researches->find($id_research)
        ]);
    }

    public function destroyResearch($id_employee, $id_research){
        $employee = Employee::find($id_employee);
        $employee->researches()->detach($id_research);
    }

    public function updateResearch(Request $request, $id_employee, $id_research){
        Employee::find($id_employee)->researches()->updateExistingPivot($id_research, ['date' => $request['date']]);
    }

    public function storeResearches($id){
        $employee = Employee::find($id);

        return response()->json([
            'employee_researches' => $employee->researches
        ]);
    }
}

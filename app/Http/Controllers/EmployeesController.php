<?php

namespace App\Http\Controllers;

use App\Http\Models\EmployeeResearch;
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
        $date_birthday = Carbon::createFromFormat('d-m-Y', $request->date_birthday)->format('Y-m-d');
        $date_employment = Carbon::createFromFormat('d-m-Y', $request->date_birthday)->format('Y-m-d');
        $userAdmin = Auth::user(); // только админ
        $employee = new Employee;
        $employee->fio = $request->fio;
        $employee->date_birthday = $date_birthday;
        $employee->date_employment = $date_employment;
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
        $organizations = $user->organizations;

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
            $this->checkMedicalResearch($employee);
        }
        foreach ($deleted as $employee) {
            $this->checkMedicalResearch($employee);
        }

        return response()->json([
            'employees' => $employees,
            'deleted' => $deleted,
            'withoutOrganization' => $withoutOrganization
        ]);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $employee = Employee::withTrashed()->where('id', $id)->first();
        $organization = $employee->organization;
        $this->checkMedicalResearch($employee);
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

        $employee->date_birthday = Carbon::createFromFormat('Y-m-d', $employee->date_birthday)->format('d-m-Y');
        $employee->date_employment = Carbon::createFromFormat('Y-m-d', $employee->date_employment)->format('d-m-Y');

        $employment_date =  Carbon::parse($employee->date_employment);
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
        $date_birthday = Carbon::createFromFormat('d-m-Y', $request->date_birthday)->format('Y-m-d');
        $date_employment = Carbon::createFromFormat('d-m-Y', $request->date_employment)->format('Y-m-d');

        $employee = Employee::find($id);
        $employee->fio = $request->fio;
        $employee->date_birthday = $date_birthday;
        $employee->date_employment = $date_employment;
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
        $employee = Employee::withTrashed()->where('id', $id)->first();
        $employeeCategoryId = $employee->organization->category_id;
        $userAdmin = IndexController::findAdmin();
        $userResearches = $userAdmin->researches;
        $employeeResearches = [];

        foreach ($userResearches as $research) {
            $employeeResearch = EmployeeResearch::firstOrCreate(
                ['user_researches_id' => $research->pivot->id, 'employee_id' => $id]
            );
            $researchCategory = ResearchCategory::find($research->id);
            if ($employeeResearch->date) {
                $employeeResearch->date = Carbon::createFromFormat('Y-m-d', $employeeResearch->date)->format('d-m-Y');
            }
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
        $this->authorize('isAdmin', $user);
        $employeeResearches = $request->employeeResearch;

        foreach ($employeeResearches as $key => $date) {
            if (!$date) {
                return null;
            }

            $date = Carbon::createFromFormat('d-m-Y', $date)->format('Y-m-d');

            EmployeeResearch::updateOrCreate(
                ['user_researches_id' => $key, 'employee_id' => $id],
                ['date' => $date]
            );
        }
    }


    /**
     * Поиск просроченных иследований
     *
     * @param $employee
     */
    public static function checkMedicalResearch($employee) {
        $userAdmin = IndexController::findAdmin();
        $userResearches = $userAdmin->researches;
        $options_ends = $employee->researches_ends = []; // просрочено
        $options_expired = $employee->researches_expired = []; // подходит к концу
        $employee->sumForReseaches = 0;
        $employeeCategoryId = $employee->organization->category_id;

        foreach ($userResearches as $userResearch) {
            if ($userResearch->category_id !== $employeeCategoryId) {
                continue;
            }

            $research = Research::find($userResearch->research_id);
            $research->researchPeriod->period; // периодичность конкретного исследования

            //$userResearch->pivot->id; //user_researches.id

            $employeeResearch = EmployeeResearch::where('employee_id', '=', $employee->id)
                ->where('user_researches_id', '=', $userResearch->pivot->id)
                ->first();

            if (is_null($employeeResearch) || is_null($employeeResearch->date)) {
                $options_ends[] = $research;
            } else {
                switch ($research->researchPeriod->period) {
                    case -1:
                        $employment_date = Carbon::parse($employee->date_employment);
                        $research_date = Carbon::parse($employeeResearch->date);
                        $research_date->addMonths(1);
                        $diffDatesResearch = $employment_date->diffInDays($research_date, false);

                        if ($diffDatesResearch < 0) {
                            array_push($options_expired, $research);
                        }
                        break;
                    case 1:
                        if (is_null($employeeResearch->date)) {
                            array_push($options_expired, $research);
                        }
                        break;
                    case 365:
                        $research_date = Carbon::parse($employeeResearch->date);
                        $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                        if ($diffDatesResearch > 365) {
                            array_push($options_ends, $research);
                        } else if ($diffDatesResearch > 335) {
                            array_push($options_expired, $research);
                        }
                        break;
                    case 730:
                        $research_date = Carbon::parse($employeeResearch->date);
                        $diffDatesResearch
                            = $research_date->diffInDays(Carbon::now());

                        if ($diffDatesResearch > 730) {
                            array_push($options_ends, $research);
                        } else if ($diffDatesResearch > 700) {
                            array_push($options_expired, $research);
                        }
                        break;
                    case 1827:
                        $research_date = Carbon::parse($employeeResearch->date);
                        $diffDatesResearch
                            = $research_date->diffInDays(Carbon::now());

                        if ($diffDatesResearch > 1827) {
                            array_push($options_ends, $research);
                        } else if ($diffDatesResearch > 1797) {
                            array_push($options_expired, $research);
                        }
                        break;
                    case 3653:
                        $research_date = Carbon::parse($employeeResearch->date);
                        $diffDatesResearch
                            = $research_date->diffInDays(Carbon::now());

                        if ($diffDatesResearch > 3653) {
                            array_push($options_ends, $research);
                        } else if ($diffDatesResearch > 3623) {
                            array_push($options_expired, $research);
                        }
                        break;
                }

                if (Carbon::parse($employeeResearch->date)->year === Carbon::now()->year &&
                    Carbon::parse($employeeResearch->date)->month === Carbon::now()->subMonth()->month
                ) {
                    $researchPrice = HospitalResearch::where('user_researches_id', '=', $employeeResearch->user_researches_id)->first()->price;
                    if (!is_null($researchPrice)){
                        $employee->sumForReseaches += $researchPrice;
                    }
                }
            }
        }

        $employee->researches_ends = $options_ends;
        $employee->researches_expired = $options_expired;
    }
}

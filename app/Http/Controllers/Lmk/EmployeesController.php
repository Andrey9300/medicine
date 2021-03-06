<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\EmployeeResearch;
use App\Http\Models\Lmk\Research;
use App\Http\Models\Lmk\Employee;
use App\Http\Models\Lmk\ResearchCategory;
use App\Http\Requests\StoreEmployee;
use App\Http\Requests\UpdateEmployee;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployeesController extends Controller
{
    public function store(StoreEmployee $request)
    {
        $date_birthday = Carbon::createFromFormat('d-m-Y', $request->date_birthday)->format('Y-m-d');
        $date_employment = Carbon::createFromFormat('d-m-Y', $request->date_employment)->format('Y-m-d');
        $userAdmin = Auth::user(); // только админ
        $employee = new Employee;
        $employee->fio = $request->fio;
        $employee->date_birthday = $date_birthday;
        $employee->date_employment = $date_employment;
        $employee->medical_book = $request->medical_book;
        $employee->user_id = $userAdmin->id;
        $employee->organization_name = $request->organization_name;
        $employee->position = $request->position;
        $employee->category_id = $request->category_id;
        $employee->comments = $request->comments;
        $employee->department = $request->department;
        $employee->save();
    }

    public function showAll()
    {
        $user = Auth::user();
        $employees = $user->employees;
        $deleted = $user->employees()->onlyTrashed()->get();
        $withoutOrganization = $user->employees()->whereNull('organization_name')->get();

        return response()->json([
            'employees' => $employees,
            'deleted' => $deleted,
            'withoutOrganization' => $withoutOrganization
        ]);
    }

    public function showAllWithCheck()
    {
        $user = Auth::user();
        $researches = Research::all();
        $employees = $user->employees;
        $deleted = $user->employees()->onlyTrashed()->get();
        $withoutOrganization = $user->employees()->whereNull('organization_name')->get();

        foreach ($employees as $employee) {
            $this->checkMedicalResearch($employee, $researches);
        }
        foreach ($deleted as $employee) {
            $this->checkMedicalResearch($employee, $researches);
        }

        return response()->json([
            'employees' => $employees,
            'deleted' => $deleted,
            'withoutOrganization' => $withoutOrganization
        ]);
    }

    public function show($id)
    {
        $researches = Research::all();
        $employee = Employee::withTrashed()->where('id', $id)->first();
        $organization = $employee->organization;
        $this->authorize('owner', $organization);
        $this->checkMedicalResearch($employee, $researches);
        $head_exist = false;

        // устанавливаем фио менеджера
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
        $employee->category;

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

    public function update(UpdateEmployee $request, $id)
    {
        $employee = Employee::find($id);
        $this->authorize('owner', $employee->organization);
        $date_birthday = Carbon::createFromFormat('d-m-Y', $request->date_birthday)->format('Y-m-d');
        $date_employment = Carbon::createFromFormat('d-m-Y', $request->date_employment)->format('Y-m-d');
        $dateStartResearch = $employee->send_to_research;

        if ($request->send_to_research) {
            $dateStartResearch = Carbon::createFromFormat('d.m.Y', $request->send_to_research)->format('Y-m-d');
        }

        $employee->fio = $request->fio;
        $employee->date_birthday = $date_birthday;
        $employee->date_employment = $date_employment;
        $employee->medical_book = $request->medical_book;
        $employee->organization_name = $request->organization_name;
        $employee->position = $request->position;
        $employee->category_id = $request->category_id;
        $employee->comments = $request->comments;
        $employee->department = $request->department;
        $employee->send_to_research = $dateStartResearch;
        $employee->save();
    }

    public function sendToResearch(UpdateEmployee $request, $id)
    {
        $employee = Employee::find($id);

        $this->authorize('owner', $employee->organization);

        $dateStartResearch = Carbon::now()->format('Y-m-d');
        $employee->send_to_research = $dateStartResearch;
        $employee->save();
    }

    public function softDelete($id)
    {
        $userAdmin = IndexController::findAdmin();
        $employee = $userAdmin->employees->find($id);
        $this->authorize('owner', $employee->organization);
        $employee->delete();
    }

    public function restore($id)
    {
        $employee = Employee::onlyTrashed()->find($id);
        $this->authorize('owner', $employee->organization);

        if (!is_null($employee)) {
            $employee->restore();
        }
    }

    public function forceDelete($id)
    {
        $userAdmin = IndexController::findAdmin();
        $employee = $userAdmin->employees->find($id);
        $this->authorize('isAdminAndOwner', $employee);
        $employee->forceDelete();
    }

    public function researches($id)
    {
        $employee = Employee::withTrashed()->where('id', $id)->first();
        $this->authorize('owner', $employee->organization);
        $employeeCategoryId = $employee->category_id;
        $userAdmin = IndexController::findAdmin();
        $userResearches = $userAdmin->researches;
        $employeeResearches = [];

        foreach ($userResearches as $research) {
            $employeeResearch = EmployeeResearch::firstOrCreate(
                ['user_researches_id' => $research->pivot->id, 'employee_id' => $id]
            );
            $researchCategory = ResearchCategory::find($research->id);
            if ($employeeResearch->date) {
                $employeeResearch->date = Carbon::createFromFormat('Y-m-d', $employeeResearch->date)->format('d.m.Y');
            }
            if ($researchCategory->category_id === $employeeCategoryId) {
                $research->category;
                $research->research;
                $research->date = $employeeResearch->date;
                $research->is_exception = $employeeResearch->is_exception;
                $employeeResearches[] = $research;
            }
        }

        return response()->json([
            'employeeResearches' => $employeeResearches
        ]);
    }

    public function researchesStore(Request $request, $id)
    {
        $user = Auth::user();
        $this->authorize('isAdmin', $user);
        $employeeResearches = $request->employeeResearch;
        $isExceptions = $request->is_exception;

        $employee = Employee::find($id);
        $this->authorize('owner', $employee->organization);
        $employee->send_to_research = null;
        $employee->save();

        foreach ($employeeResearches as $key => $date) {
            $isException = false;
            $dateSave = null;

            if ($date) {
                $dateSave = Carbon::createFromFormat('d.m.Y', $date)->format('Y-m-d');
            }

            if (!is_null($isExceptions) && array_key_exists($key, $isExceptions)) {
                $isException = $isExceptions[$key] === 'on' ? 1 : 0;
            }

            EmployeeResearch::updateOrCreate(
                ['user_researches_id' => $key, 'employee_id' => $id],
                ['date' => $dateSave, 'is_exception' => $isException]
            );
        }
    }

    public static function checkMedicalResearch($employee, $researches = [])
    {
        $user = Auth::user();
        $options_ends = $employee->researches_ends = []; // просрочено
        $options_expired = $employee->researches_expired = []; // подходит к концу
        $gepatitDate1 = null;
        $gepatitDate2 = null;
        $gepatitResearch1 = null;
        $gepatitResearch2 = null;
        $userResearchesFiltered = $user->researches->where('category_id', $employee->category_id);

        foreach ($userResearchesFiltered as $userResearch) {
            $research = $researches->find($userResearch->research_id);
            $research->researchPeriod->period; // периодичность конкретного исследования
            $employeeResearch = EmployeeResearch::where('employee_id', '=', $employee->id)
                ->where('user_researches_id', '=', $userResearch->pivot->id)
                ->first();

            if (is_null($employeeResearch) || is_null($employeeResearch->date)) {
                // если отвод по медицинским показаниям
                if (!is_null($employeeResearch) && $employeeResearch->is_exception === 1) {
                    continue;
                }

                $date_birthday = Carbon::createFromDate($employee->date_birthday);
                $diffDatesResearch = $date_birthday->diffInYears(Carbon::now());

                // против Кори старше 55 лет не нужно
                if ($research->id === 15 && $diffDatesResearch >= 55) {
                    continue;
                }

                $options_ends[] = $research;
            } else {
                // если отвод по медицинским показаниям
                if ($employeeResearch->is_exception === 1) {
                    continue;
                }

                if ($userResearch->research_id === 14) {
                    $gepatitDate1 = Carbon::parse($employeeResearch->date);
                    $gepatitResearch1 = $research;
                }

                if ($userResearch->research_id === 20) {
                    $gepatitDate2 = Carbon::parse($employeeResearch->date);
                    $gepatitResearch2 = $research;
                }

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
            }
        }

        // для гепатита А разница между дата №1 и дата №2 должна быть не больше 12 месяцев
        $diffMonthGepatit = 12;
        if (!is_null($gepatitDate1) && !is_null($gepatitDate2)) {
            $diffGepatit = $gepatitDate1->diffInMonths($gepatitDate2);

            if ($diffGepatit >= $diffMonthGepatit) {
                array_push($options_ends, $gepatitResearch1);
                array_push($options_ends, $gepatitResearch2);
            }
        } else if (!is_null($gepatitDate1)) {
            $diffGepatit = $gepatitDate1->diffInMonths(Carbon::now());

            if ($diffGepatit < $diffMonthGepatit) {
                foreach ($options_ends as $key => $value) {
                    if ($value->id === 20 || $value->id === 14) {
                        unset($options_ends[$key]);
                    }
                }
                foreach ($options_expired as $key => $value) {
                    if ($value->id === 20 || $value->id === 14) {
                        unset($options_expired[$key]);
                    }
                }
            }
        }

        $employee->researches_ends = $options_ends;
        $employee->researches_expired = $options_expired;
    }
}

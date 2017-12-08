<?php

namespace App\Http\Controllers;

use App\Http\Models\Employee;
use App\Http\Models\EmployeeResearch;
use App\Http\Models\HospitalResearch;
use App\Http\Models\Research;
use App\Http\Models\UserResearches;
use App\Http\Requests\StoreEmployee;
use App\Http\Requests\StoreOrganization;
use App\Http\Requests\UpdateOrganization;
use App\Notifications\SendPassword;
use App\Notifications\YouHead;
use App\User;
use App\Http\Models\Organization;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrganizationController extends Controller
{

    /**
     * Поиск просроченных иследований
     *
     * @param $employee
     */
    public static function checkMedicalResearch($employee){
        $user = Auth::user();
        $userResearches = $user->researches;
        $options_ends = $employee->researches_ends = []; // подходит к концу
        $options_expired = $employee->researches_expired = []; // просрочено
        $employee->sumForReseaches = 0;

        foreach ($userResearches as $userResearch) {
            $research = Research::find($userResearch->research_id);
            $research->researchPeriod->period; // периодичность конкретного исследования

            //$userResearch->pivot->id; //user_researches.id

            $employeeResearch = EmployeeResearch::where('employee_id', '=', $employee->id)
                ->where('user_researches_id', '=', $userResearch->pivot->id)
                ->first();

            if (is_null($employeeResearch) || is_null($employeeResearch->date)) {
                $options_expired[] = $research;
            } else {
                switch ($research->researchPeriod->period) {
                    case -1:
                        $employment_date
                            = Carbon::parse($employee->date_employment);
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
                        $diffDatesResearch
                            = $research_date->diffInDays(Carbon::now());

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

    /**
     * Создать организацию
     *
     * @param StoreOrganization $request
     * @return \Response
     */
    public function store(StoreOrganization $request)
    {
        $organization = new Organization;
        $organization->name = $request->name;
        $organization->address = $request->address;
        $organization->legal_entity_id = $request->legal_entity_id;
        $organization->region_id = $request->region_id;
        $organization->category_id = $request->category_id;
        $organization->phone = $request->phone;

        // привязка руководителя к организации: по умолчанию текущий user,
        // иначе создаем user с role = head или ищем в системе
        if (User::where('email', $request->head_email)->exists()) {
            $user = User::where('email', $request->head_email)->first();
            $organization->head_email = $user->email;
            $organization->save();
            $user->organizations()->attach($organization);
            $user->notify(new YouHead($organization->name));

            $userAdmin = Auth::user();
            if ($userAdmin->email != $user->email) {
                $userAdmin->organizations()->attach($organization);
            }
        } else {
            $passwordNewUser = str_random(8);
            $newUser = User::create([
                'email' => $request->head_email,
                'password' => bcrypt($passwordNewUser),
                'role' => 'head',
                'active' => true
            ]);
            $organization->head_email = $newUser->email;
            $organization->save();
            $newUser->organizations()->attach($organization);
            $newUser->notify(new SendPassword($newUser->email, $passwordNewUser, $organization->name));
            $userAdmin = Auth::user();
            $userAdmin->organizations()->attach($organization);
        }

        return response('Ок', 200);
    }

    /**
     * Вывести организации начальника качества
     * Если указано юридическое лицо, то только организации этого юр лица
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll(Request $request)
    {
        $user = Auth::user();

        if ($request->legalEntityId) {
            $organizations = $user->organizations()->where('legal_entity_id', '=', $request->legalEntityId)->get();
        } else {
            $organizations = $user->organizations;
        }

        $head_exist = false;

        foreach ($organizations as $organization) {
            // устанавливаем фио руководителя
            // если есть head берём его, если нет, то админа
            foreach ($organization->users as $user) {
                if ($user->role === 'head'){
                    $organization->head_fio = $user->fio;
                    $organization->head_email = $user->email;
                    $head_exist = true;
                }
            }

            if (!$head_exist) {
                $organization->head_fio = $organization->users[0]->fio;
                $organization->head_email = $organization->users[0]->email;
            }

            $organization->legal_entity;
        }

        return response()->json([
            'organizations' => $organizations
        ]);
    }

    /**
     * Вывести организации с учетом юр лица, имеющие сотрудников с просроченными МО
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function expired(Request $request)
    {
        $user = Auth::user();

        if ($request->legalEntityId) {
            $organizations = $user->organizations()->where('legal_entity_id', '=', $request->legalEntityId)->get();
        } else {
            $organizations = $user->organizations;
        }

        $head_exist = false;
        $expiredOrganizations = [];

        foreach ($organizations as $organization) {
            // устанавливаем фио руководителя
            // если есть head берём его, если нет, то админа
            foreach ($organization->users as $user) {
                if ($user->role === 'head'){
                    $organization->head_fio = $user->fio;
                    $organization->head_email = $user->email;
                    $head_exist = true;
                }
            }

            if (!$head_exist) {
                $organization->head_fio = $organization->users[0]->fio;
                $organization->head_email = $organization->users[0]->email;
            }

            $organization->legal_entity;

            $employees_current = $organization->employees;
            $medicalResearchesProblem = false;

            foreach ($employees_current as $employee) {
                OrganizationController::checkMedicalResearch($employee);
                if (count($employee->researches_ends)) {
                    $employeesResearchesEnds[] = $employee;
                    $medicalResearchesProblem = true;
                } else if (count($employee->researches_expired)) {
                    $employeesResearchesExpired[] = $employee;
                    $medicalResearchesProblem = true;
                }
                $employees[] = $employee;
            }

            if ($medicalResearchesProblem) {
                $expiredOrganizations[] = $organization;
            }
        }

        return response()->json([
            'expired' => $expiredOrganizations
        ]);
    }

    /**
     * Получить данные организации
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $organization->region;
        $organization->category;
        $organization->legal_entity;
        $head_exist = false;
        $organization->totalSumForCompletedResearches = 0;
        $organization->totalSumForResearches = 0;
        $user = Auth::user();
        $employees = $organization->employees;
        foreach ($employees as $employee) {
            $this->checkMedicalResearch($employee);
            $organization->totalSumForCompletedResearches += $employee->sumForReseaches;
        }

        $userHospitalResearches = HospitalResearch::whereIn('user_researches_id', $user->researches)->get();

        foreach ($userHospitalResearches as $userHospitalResearch) {
            if (!is_null($userHospitalResearch->price)) {
                $organization->totalSumForResearches += $userHospitalResearch->price;
            }
        }

        // устанавливаем фио руководителя
        // если есть head берём его, если нет, то админа
        foreach ($organization->users as $user) {
            if ($user->role === 'head'){
                $organization->head_fio = $user->fio;
                $organization->head_email = $user->email;
                $head_exist = true;
            }
        }

        if (!$head_exist) {
            $organization->head_fio = $organization->users[0]->fio;
            $organization->head_email = $organization->users[0]->email;
        }

        return response()->json([
            'organization' => $organization
        ]);
    }

    /**
     * Обновить организацию
     *
     * @param UpdateOrganization $request
     * @param                    $id
     * @return \Response
     */
    public function update(UpdateOrganization $request, $id)
    {
        $organization_new = $request->all();
        $organization = Organization::find($id);
        $organization->name = $organization_new['name'];
        $organization->address = $organization_new['address'];
        $organization->legal_entity_id = $organization_new['legal_entity_id'];
        $organization->region_id = $organization_new['region_id'];
        $organization->category_id = $organization_new['category_id'];
        $organization->phone = $organization_new['phone'];

        // админов может быть несколько
        // руководитель 1 или 0
        if ($organization->head_email !== $organization_new['head_email']) {
            $oldUser = User::where('email', $organization->head_email)->first();
            if ($oldUser->role !== 'admin' && $organization->users->contains($oldUser)) {
                $oldUser->organizations()->detach($organization);
            }

            if (User::where('email', $organization_new['head_email'])->exists()) {
                $user = User::where('email', $organization_new['head_email'])->first();
                if (!$organization->users->contains($user)) { // если руководителем снова стал admin
                    $user->organizations()->attach($organization);
                    $user->notify(new YouHead($organization->name));
                }
            } else {
                $passwordNewUser = str_random(8);
                $newUser = User::create([
                    'email' => $organization_new['head_email'],
                    'password' => bcrypt($passwordNewUser),
                    'role' => 'head',
                    'active' => 1
                ]);
                $newUser->organizations()->attach($organization);
                $newUser->notify(new SendPassword($newUser->email, $passwordNewUser, $organization->name));
            }

            $organization->head_email = $organization_new['head_email'];
        }

        $organization->save();

        return response('Ок', 200);
    }

    /**
     * Удалить организацию
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        $organization = Organization::find($id);
        $this->authorize('isAdminAndOwner', $organization);
        foreach ($organization->employees()->withTrashed()->get() as $employee) {
            $employee->organization_name = null;
            $employee->save();
            $employee->delete();
        }

        $organization->destroy($id);
    }

    /**
     * Создать сотрудника организации
     *
     * @param StoreEmployee $request
     * @param               $organization_id
     */
    public function storeEmployee(StoreEmployee $request, $organization_id)
    {
        $organization = Organization::find($organization_id);
        $userAdmin = $organization->users->where('role', '=', 'admin')->first();
        $employee = new Employee;
        $employee->fio = $request->fio;
        $employee->date_birthday = $request->date_birthday;
        $employee->date_employment = $request->date_employment;
        $employee->medical_book = $request->medical_book;
        $employee->user_id = $userAdmin->id;
        $employee->organization_name = $organization->name;
        $employee->save();
    }

    /**
     * Показать сотрудников организации
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAllEmployees($id){
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $employees = [];
        /*foreach ($organization->users as $user) {
            array_push($users, $this->checkMedicalResearch($user));
        }*/

        return response()->json([
            'organization_employees' => $organization->employees
        ]);
    }
}

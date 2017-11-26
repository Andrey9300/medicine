<?php

namespace App\Http\Controllers;

use App\Http\Models\Employee;
use App\Http\Models\Research;
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
     * @param $employee
     */
    // TODO вынести в common
    public static function checkMedicalResearch($employee){
        // TODO period from bd
        $options_ended = $employee->researches_ended = [];
        $options_expired = $employee->researches_expired = [];

        $researches = Research::all();
        foreach ($researches as $key => $research) {
            foreach ($employee->researches as $employee_research) {
                if ($research->id === $employee_research->id) {
                    switch ($employee_research->period) {
                        case -1:
                            $employment_date = Carbon::parse($employee->date_employment);
                            $research_date = Carbon::parse($employee_research->pivot->date);
                            $research_date->addMonths(1);
                            $diffDatesResearch = $employment_date->diffInDays($research_date, false);

                            if ($diffDatesResearch < 0){
                                array_push($options_expired, $employee_research);
                            }
                            break;
                        case 1:
                            if (is_null($employee_research->pivot->date)){
                                array_push($options, $employee_research);
                            }
                            break;
                        case 365:
                            $research_date = Carbon::parse($employee_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 365) {
                                array_push($options_ended, $employee_research);
                            } else if ($diffDatesResearch > 335){
                                array_push($options_expired, $employee_research);
                            }
                            break;
                        case 730:
                            $research_date = Carbon::parse($employee_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 730) {
                                array_push($options_ended, $employee_research);
                            } else if ($diffDatesResearch > 700){
                                array_push($options_expired, $employee_research);
                            }
                            break;
                        case 1827:
                            $research_date = Carbon::parse($employee_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 1827) {
                                array_push($options_ended, $employee_research);
                            } else if ($diffDatesResearch > 1797){
                                array_push($options_expired, $employee_research);
                            }
                            break;
                        case 3653:
                            $research_date = Carbon::parse($employee_research->pivot->date);
                            $diffDatesResearch = $research_date->diffInDays(Carbon::now());

                            if ($diffDatesResearch > 3653) {
                                array_push($options_ended, $employee_research);
                            } else if ($diffDatesResearch > 3623){
                                array_push($options_expired, $employee_research);
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

        $employee->researches_ended = $options_ended;
        $employee->researches_expired = $options_expired;

        return $employee;
    }

    /**
     * Создать организацию
     *
     * @param Request $request
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
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
                'role' => 'head'
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
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $user = Auth::user();
        $organizations = $user->organizations;
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
        $organization->employees;
        $organization->legal_entity;
        $head_exist = false;

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
     * @param Request $request
     * @param         $id
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function update(UpdateOrganization $request, $id)
    {
        $organization_new = $request->all();
        $organization = Organization::find($id);
        $organization->name = $organization_new['name'];
        $organization->address = $organization_new['address'];
        $organization->legal_entity_id = $organization_new['legal_entity_id'];
        $organization->phone = $organization_new['phone'];

        // админов может быть несколько
        // руководитель 1|0
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
                    'role' => 'head'
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
     * Сотрудники объекта
     */

    /**
     * Создать сотрудника организации
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function storeEmployee(StoreEmployee $request, $organization_id)
    {
        $organization = Organization::find($organization_id);
        //$this->authorize('owner', $organization);
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
     * @param $id
     *
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

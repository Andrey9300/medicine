<?php

namespace App\Http\Controllers;

use App\Http\Models\Employee;
use App\Http\Models\Research;
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
    public function create(Request $request)
    {
        $this->authorize('create', Organization::class);

        $organization = new Organization;
        $organization->name = $request->name;
        $organization->address = $request->address;
        $organization->legal_entity = $request->legal_entity;
        $organization->region_id = $request->region_id;
        $organization->category_id = $request->category_id;
        $organization->phone = $request->phone;

        // привязка руководителя к организации: по умолчанию текущий user,
        // иначе создаем user с role = head или ищем в системе
        if ($request->head_email) {
            if (User::where('email', $request->head_email)->exists()) {
                $user = User::where('email', $request->head_email)->first();
                $organization->head_email = $user->email;
                $organization->save();
                $user->organizations()->attach($organization);
                $user->notify(new YouHead($organization->name));
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
            }

            $user = Auth::user();
            $user->organizations()->attach($organization);
            return response('Ок', 200);
        } else {
            return response('Ошибка создания организации, попробуйте еще раз', 400);
        }
    }

    /**
     * Вывести организации
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Organization $organization)
    {
        $user = Auth::user();

        return response()->json([
            'organizations' => $user->organizations
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
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $organization->region;
        $organization->category;
        $organization->employees;
        $organization->head_fio = Auth::user()->fio;

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
    public function update(Request $request, $id)
    {
        $organization_new = $request->all();
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $organization->name = $organization_new['name'];
        $organization->address = $organization_new['address'];
        $organization->legal_entity = $organization_new['legal_entity'];
        $organization->phone = $organization_new['phone'];

        if ($organization->head_email !== $organization_new['head_email']) {
            if (User::where('email', $organization_new['head_email'])->exists()) {
                $user = User::where('email', $request->head_email)->first();
                $user->organizations()->attach($organization);
                $user->notify(new YouHead($organization->name));
            } else {
                $passwordNewUser = str_random(8);
                $newUser = User::create([
                    'email' => $request->head_email,
                    'password' => bcrypt($passwordNewUser),
                    'role' => 'head'
                ]);
                $newUser->organizations()->attach($organization);
                $newUser->notify(new SendPassword($newUser->email, $passwordNewUser, $organization->name));
            }
        }

        $organization->head_email = $organization_new['head_email'];
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
        $this->authorize('owner', $organization);
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
    public function createEmployee(Request $request, $organization_id)
    {
        $organization = Organization::find($organization_id);
        $this->authorize('create', $organization);
        $employee = new Employee;
        $employee->fio = $request->fio;
        $employee->date_birthday = $request->date_birthday;
        $employee->date_employment = $request->date_employment;
        $employee->date_inactive = $request->date_inactive;
        $employee->medical_book = $request->medical_book;
        $employee->active = $request->active;
        $employee->organization_name = $organization->name;
        $employee->active = true;
        $employee->save();
    }

    /**
     * Показать сотрудников организации
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeEmployees($id){
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

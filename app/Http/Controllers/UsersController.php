<?php

namespace App\Http\Controllers;

use App\Http\Models\Organization;
use App\Http\Models\Research;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Создать сотрудника
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function create(Request $request)
    {
        $user = new User;
        $user->fio = $request->fio;
        $user->password = bcrypt($request->password);
        $user->date_birthday = $request->date_birthday;
        $user->date_employment = $request->date_employment;
        $user->medical_book = $request->medical_book;
        $user->role = $request->role;
        $user->email = $request->email;
        $user->organization_name = $request->organization_name;
        $user->save();
    }

    /**
     * Вывести организации
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        return response()->json([
            'users' => User::all()
        ]);
    }

    /**
     * Отдать данные сотрудника
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::find($id);
        $user->organization;
        $user = OrganizationController::checkMedicalResearch($user);

        $employment_date = Carbon::parse($user->date_employment);
        $diffDatesResearch = $employment_date->diffInMonths(Carbon::now());

        if ($diffDatesResearch < 3) {
            $user->pay = true; // сотрудник платит наличными
        } else {
            $user->pay = false; // платит орагнизация
        }

        return response()->json([
            'user' => $user
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
        $user = User::find($id);
        $user->fio = $request->fio;
        $user->password = bcrypt($request->password);
        $user->date_birthday = $request->date_birthday;
        $user->date_employment = $request->date_employment;
        $user->medical_book = $request->medical_book;
        $user->role = $request->role;
        $user->email = $request->email;
        $user->organization_name = $request->organization_name;
        $user->save();
    }

    /**
     * Удалить сотрудника
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        User::destroy($id);
    }

    /**
     * Исследования сотрудников
     */

    public function createResearch(Request $request, $id_user){
        $user = User::find($id_user);
        $user->researches()->attach($request->name, ['date' => $request->date]);
    }

    public function editResearch($id_user, $id_research){
        $user = User::find($id_user);

        return response()->json([
            'user_research' => $user->researches->find($id_research)
        ]);
    }

    public function destroyResearch($id_user, $id_research){
        $user = User::find($id_user);
        $user->researches()->detach($id_research);
    }

    public function updateResearch(Request $request, $id_user, $id_research){
        User::find($id_user)->researches()->updateExistingPivot($id_research, ['date' => $request['date']]);
    }

    public function storeResearches($id){
        $user = User::find($id);

        return response()->json([
            'user_researches' => $user->researches
        ]);
    }

}

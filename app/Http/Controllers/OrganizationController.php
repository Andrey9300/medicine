<?php

namespace App\Http\Controllers;

use App\Http\Models\HospitalResearch;
use App\Http\Models\ResearchCategory;
use App\Http\Models\UserResearches;
use App\Http\Requests\StoreOrganization;
use App\Http\Requests\UpdateOrganization;
use App\Notifications\SendPassword;
use App\Notifications\YouHead;
use App\User;
use App\Http\Models\Organization;
use Illuminate\Support\Facades\Auth;

class OrganizationController extends Controller
{
    /**
     * Создать организацию
     *
     * @param StoreOrganization $request
     * @return \Response
     */
    public function store(StoreOrganization $request)
    {
        $currentUser = Auth::user();
        $organization = new Organization;
        $organization->name = $request->name;
        $organization->category_id = $request->category_id;
        $organization->head_email = $currentUser->email;
        $organization->save();

        $currentUser->organizations()->attach($organization);

        // привязка руководителя к организации: по умолчанию текущий user,
        // иначе создаем user с role = head или ищем в системе
//        if (User::where('email', $request->head_email)->exists()) {
//            $user = User::where('email', $request->head_email)->first();
//            $organization->head_email = $user->email;
//            $organization->save();
//            $user->organizations()->attach($organization);
//            $user->notify(new YouHead($organization->name));
//
//            $currentUser = Auth::user();
//            if ($currentUser->email != $user->email) {
//                $currentUser->organizations()->attach($organization);
//            }
//        } else {
//            $passwordNewUser = str_random(8);
//            $newUser = User::create([
//                'fio' => $request->head_fio,
//                'email' => $request->head_email,
//                'password' => bcrypt($passwordNewUser),
//                'role' => 'head',
//                'active' => true
//            ]);
//            $organization->head_email = $newUser->email;
//            $organization->save();
//            $newUser->organizations()->attach($organization);
//            $newUser->notify(new SendPassword($newUser->email, $passwordNewUser, $organization->name));
//            $userAdmin = Auth::user();
//            $userAdmin->organizations()->attach($organization);
//        }


        return response('Ok', 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAll()
    {
        $user = Auth::user();
        $organizations = $user->organizations;
        $head_exist = false;

        foreach ($organizations as $organization) {
            // устанавливаем фио руководителя
            // если есть head берём его, если нет, то админа
            foreach ($organization->users as $user) {
                if ($user->role === 'head') {
                    $organization->head_fio = $user->fio;
                    $organization->head_email = $user->email;
                    $head_exist = true;
                } else {
                    $head_exist = false;
                }
            }

            if (!$head_exist) {
                $organization->head_fio = $organization->users[0]->fio;
                $organization->head_email = $organization->users[0]->email;
            }
        }

        return response()->json([
            'organizations' => $organizations
        ]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function expired()
    {
        // TODO будет еще endsEmployees, нужно объединить или дополнить showAll
        $user = Auth::user();
        $organizations = $user->organizations;
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

            $employees_current = $organization->employees;
            $medicalResearchesProblem = false;

            foreach ($employees_current as $employee) {
                EmployeesController::checkMedicalResearch($employee);
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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $organization->category;
        $head_exist = false;
        $organization->totalSumForCompletedResearches = 0;
        $organization->totalSumForResearches = 0;
        $user = Auth::user();
        $employees = $organization->employees;
        foreach ($employees as $employee) {
            EmployeesController::checkMedicalResearch($employee);
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
        $organization->category_id = $organization_new['category_id'];

        // админов может быть несколько
        // руководитель 1 или 0
//        if ($organization->head_email !== $organization_new['head_email']) {
//            $oldUser = User::where('email', $organization->head_email)->first();
//            if ($oldUser->role !== 'admin' && $organization->users->contains($oldUser)) {
//                $oldUser->organizations()->detach($organization);
//            }
//
//            if (User::where('email', $organization_new['head_email'])->exists()) {
//                $user = User::where('email', $organization_new['head_email'])->first();
//                $user->fio = $organization_new['head_fio'];
//                $user->save();
//                if (!$organization->users->contains($user)) { // если руководителем снова стал admin
//                    $user->organizations()->attach($organization);
//                    $user->notify(new YouHead($organization->name));
//                }
//            } else {
//                $passwordNewUser = str_random(8);
//                $newUser = User::create([
//                    'fio' => $organization_new['head_fio'],
//                    'email' => $organization_new['head_email'],
//                    'password' => bcrypt($passwordNewUser),
//                    'role' => 'head',
//                    'active' => 1
//                ]);
//                $newUser->organizations()->attach($organization);
//                $newUser->notify(new SendPassword($newUser->email, $passwordNewUser, $organization->name));
//            }
//
//            $organization->head_email = $organization_new['head_email'];
//        } else {
//            $currentUser = User::where('email', $organization->head_email)->first();
//            $currentUser->fio = $organization_new['head_fio'];
//            $currentUser->save();
//        }

        $organization->save();

        return response('Ок', 200);
    }

    /**
     * Удалить организацию
     *
     * @param int $id
     * @throws \Illuminate\Auth\Access\AuthorizationException
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
}

<?php

namespace App\Http\Controllers\Lmk;

use App\Http\Models\Lmk\HospitalResearch;
use App\Http\Models\Lmk\Research;
use App\Http\Requests\StoreOrganization;
use App\Http\Requests\UpdateOrganization;
use App\Http\Models\Lmk\Organization;
use Illuminate\Support\Facades\Auth;

class OrganizationController extends Controller
{
    public function store(StoreOrganization $request)
    {
        $currentUser = Auth::user();
        $organization = new Organization;
        $organization->name = $request->name;
        $organization->category_id = $request->category_id;
        $organization->head_position = $request->head_position;
        $organization->head_phone = $request->head_phone;
        $organization->head_email = $currentUser->email;
        $organization->address_fact = $request->address_fact;
        $organization->address_legal = $request->address_legal;
        $organization->okved = $request->okved;
        $organization->save();

        $currentUser->organizations()->attach($organization);

        // привязка менеджера к организации: по умолчанию текущий user,
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

    public function showAll()
    {
        $user = Auth::user();
        $organizations = $user->organizations;
        $head_exist = false;

        foreach ($organizations as $organization) {
            // устанавливаем фио менеджера
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

    public function expired()
    {
        // TODO будет еще endsEmployees, нужно объединить или дополнить showAll
        $user = Auth::user();
        $organizations = $user->organizations;
        $head_exist = false;
        $expiredOrganizations = [];
        $researches = Research::all();

        foreach ($organizations as $organization) {
            // устанавливаем фио менеджера
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
                EmployeesController::checkMedicalResearch($employee, $researches);
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

    public function show($id)
    {
        $user = Auth::user();
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $organization->category;
        $head_exist = false;
        $organization->totalSumForCompletedResearches = 0;
        $organization->totalSumForResearches = 0;

        $organization->employees;
        $userHospitalResearches = HospitalResearch::whereIn('user_researches_id', $user->researches)->get();

        foreach ($userHospitalResearches as $userHospitalResearch) {
            if (!is_null($userHospitalResearch->price)) {
                $organization->totalSumForResearches += $userHospitalResearch->price;
            }
        }

        // устанавливаем фио менеджера
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

    public function employeesWithCheck($id)
    {
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $employees = $organization->employees;
        $researches = Research::all();

        foreach ($employees as $employee) {
            EmployeesController::checkMedicalResearch($employee, $researches);
        }

        return response()->json([
            'employeesWithCheck' => $employees
        ]);
    }

    public function showTrashedEmployees($id)
    {
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $trashedEmployees = $organization->employees()->onlyTrashed()->get();
        $researches = Research::all();

        foreach ($trashedEmployees as $employee) {
            EmployeesController::checkMedicalResearch($employee, $researches);
        }

        return response()->json([
            'trashedEmployees' => $trashedEmployees
        ]);
    }

    public function update(UpdateOrganization $request, $id)
    {
        $organization_new = $request->all();
        $organization = Organization::find($id);
        $this->authorize('owner', $organization);
        $organization->category_id = $organization_new['category_id'];
        $organization->head_position = $organization_new['head_position'];
        $organization->head_phone = $organization_new['head_phone'];
        $organization->address_fact = $organization_new['address_fact'];
        $organization->address_legal = $organization_new['address_legal'];
        $organization->okved = $organization_new['okved'];

        // админов может быть несколько
        // менеджер 1 или 0
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
//                if (!$organization->users->contains($user)) { // если менеджером снова стал admin
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

    public function destroy($id)
    {
        $organization = Organization::find($id);
        $this->authorize('isAdminAndOwner', $organization);
        $employees = $organization->employees()->withTrashed()->get();

        if (count($employees) > 0) {
            return response()->json(['hasEmployees' => true]);
        }

        $organization->delete();
    }
}

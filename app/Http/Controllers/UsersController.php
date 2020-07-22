<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function store(Request $request)
    {
        $userAdmin = Auth::user();
        $organization = $userAdmin->organizations->first();

        $newUser = new User;
        $newUser->fio = $request->fio;
        $newUser->password = bcrypt($request->password);
        $newUser->email = $request->email;
        $newUser->active = '0';
        $newUser->save();

        $newUser->organizations()->attach($organization);
    }

    public function createAuditor(Request $request)
    {
        $userAdmin = Auth::user();

        $newUser = new User;
        $newUser->fio = $request->fio;
        $newUser->password = bcrypt($request->password);
        $newUser->email = $request->email;
        $newUser->active = '1';
        $newUser->save();

        $userUnits = $userAdmin->units;
        $placeCheckLists = $userAdmin->placeCheckLists;
        $placeCheckListCriterion = $userAdmin->placeCheckListCriterion;
        $groupCriterionLists = $userAdmin->groupCriterionLists;
        $groupCriterions = $userAdmin->groupCriterions;
        $criterions = $userAdmin->criterions;
        $criterionLists = $userAdmin->criterionLists;

        foreach ($userUnits as $userUnit) {
            $newUser->units()->attach($userUnit);
        }

        foreach ($placeCheckLists as $placeCheckList) {
            $newUser->placeCheckLists()->attach($placeCheckList);
        }

        foreach ($placeCheckListCriterion as $checkListCriterion) {
            $newUser->placeCheckListCriterion()->attach($checkListCriterion);
        }

        foreach ($groupCriterionLists as $groupCriterionList) {
            $newUser->groupCriterionLists()->attach($groupCriterionList);
        }

        foreach ($groupCriterions as $groupCriterion) {
            $newUser->groupCriterions()->attach($groupCriterion);
        }

        foreach ($criterions as $criterion) {
            $newUser->criterions()->attach($criterion);
        }
        
        foreach ($criterionLists as $criterionList) {
            $newUser->criterionLists()->attach($criterionList);
        }
    }

    public function currentUser()
    {
        return response()->json([
            'currentUser' => Auth::user()
        ]);
    }

    public function showAuditors()
    {
        $userAdmin = Auth::user();
        $userUnit = $userAdmin->units->first();

        return response()->json([
            'auditors' => $userUnit->users
        ]);
    }

    public function showUser($id)
    {
        return response()->json([
            'user' => User::find($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->fio = $request->fio;
//        $user->password = bcrypt($request->password);
//        $user->date_birthday = $request->date_birthday;
//        $user->date_employment = $request->date_employment;
//        $user->medical_book = $request->medical_book;
//        $user->role = $request->role;
        $user->email = $request->email;
//        $user->organization_name = $request->organization_name;
        $user->save();
    }

    public function destroy($id)
    {
        User::destroy($id);
    }
}

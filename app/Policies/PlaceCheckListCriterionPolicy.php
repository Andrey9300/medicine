<?php

namespace App\Policies;

use App\Http\Models\Audits\PlaceCheckListCriterion;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PlaceCheckListCriterionPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, PlaceCheckListCriterion $placeCheckListCriterion)
    {
        return $placeCheckListCriterion->users->find($user);
    }
}

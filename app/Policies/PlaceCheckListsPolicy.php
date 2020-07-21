<?php

namespace App\Policies;

use App\Http\Models\Audits\PlaceCheckLists;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PlaceCheckListsPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, PlaceCheckLists $placeCheckLists)
    {
        return $placeCheckLists->users->find($user);
    }
}

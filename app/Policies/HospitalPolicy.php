<?php

namespace App\Policies;

use App\User;
use App\Http\Models\Hospital;
use Illuminate\Auth\Access\HandlesAuthorization;

class HospitalPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create hospitals.
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    /**
     * @param User     $user
     * @param Hospital $hospital
     *
     * @return mixed
     */
    public function owner(User $user, Hospital $hospital)
    {
        return $hospital->user_id === $user->id;
    }

    /**
     * @param User     $user
     * @param Hospital $hospital
     *
     * @return mixed
     */
    public function isAdminAndOwner(User $user, Hospital $hospital)
    {
        return $hospital->user_id === $user->id && $user->role === 'admin';
    }
}

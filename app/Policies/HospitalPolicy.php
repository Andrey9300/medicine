<?php

namespace App\Policies;

use App\User;
use App\Http\Models\Hospital;
use Illuminate\Auth\Access\HandlesAuthorization;

class HospitalPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the hospital.
     *
     * @param  \App\User  $user
     * @param  \App\Hospital  $hospital
     * @return mixed
     */
    public function view(User $user, Hospital $hospital)
    {
        //
    }

    /**
     * Determine whether the user can create hospitals.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the hospital.
     *
     * @param  \App\User  $user
     * @param  \App\Hospital  $hospital
     * @return mixed
     */
    public function update(User $user, Hospital $hospital)
    {
        //
    }

    /**
     * Determine whether the user can delete the hospital.
     *
     * @param  \App\User  $user
     * @param  \App\Hospital  $hospital
     * @return mixed
     */
    public function delete(User $user, Hospital $hospital)
    {
        //
    }

    /**
     * @param User     $user
     * @param Hospital $hospital
     *
     * @return mixed
     */
    public function owner(User $user, Hospital $hospital)
    {
        return $hospital->users->find($user);
    }
}

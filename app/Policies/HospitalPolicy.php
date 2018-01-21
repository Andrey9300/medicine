<?php

namespace App\Policies;

use App\User;
use App\Http\Models\Hospital;
use Illuminate\Auth\Access\HandlesAuthorization;

class HospitalPolicy
{
    use HandlesAuthorization;

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

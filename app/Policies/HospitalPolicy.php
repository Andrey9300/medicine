<?php

namespace App\Policies;

use App\User;
use App\Http\Models\Lmk\Hospital;
use Illuminate\Auth\Access\HandlesAuthorization;

class HospitalPolicy
{
    use HandlesAuthorization;

    public function isAdminAndOwner(User $user, Hospital $hospital)
    {
        return $hospital->user_id === $user->id && $user->role === 'admin';
    }
}

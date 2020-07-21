<?php

namespace App\Policies;

use App\Http\Models\Audits\Units;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UnitsPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, Units $unit)
    {
        return $unit->users->find($user);
    }
}

<?php

namespace App\Policies;

use App\Http\Models\Pest\PestUnit;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PestUnitPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, PestUnit $pestUnit)
    {
        return $pestUnit->user_id === $user->id;
    }
}

<?php

namespace App\Policies;

use App\Http\Models\Pest\PestLocation;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PestLocationPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, PestLocation $pestLocation)
    {
        return $pestLocation->users->find($user);
    }
}

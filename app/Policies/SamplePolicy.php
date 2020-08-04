<?php

namespace App\Policies;

use App\Http\Models\Sample;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SamplePolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, Sample $sample)
    {
        return $sample->users->find($user);
    }

    public function isAdminAndOwner(User $user, Sample $sample)
    {
        return $sample->users->find($user) && $user->role === 'admin';
    }
}

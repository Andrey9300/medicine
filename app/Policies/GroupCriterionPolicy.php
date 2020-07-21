<?php

namespace App\Policies;

use App\Http\Models\Audits\GroupCriterion;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GroupCriterionPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, GroupCriterion $groupCriterion)
    {
        return $groupCriterion->users->find($user);
    }
}

<?php

namespace App\Policies;

use App\Http\Models\Audits\CriterionList;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CriterionListsPolicy
{
    use HandlesAuthorization;

    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    public function owner(User $user, CriterionList $criterionList)
    {
        return $criterionList->users->find($user);
    }
}

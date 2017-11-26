<?php

namespace App\Policies;

use App\User;
use App\Http\Models\LegalEntity;
use Illuminate\Auth\Access\HandlesAuthorization;

class LegalEntityPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create legalEntities.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    /**
     * @param User     $user
     * @param LegalEntity $legalEntity
     *
     * @return mixed
     */
    public function owner(User $user, LegalEntity $legalEntity)
    {
        return $legalEntity->user_id === $user->id;
    }

    /**
     * @param User     $user
     * @param LegalEntity $legalEntity
     *
     * @return mixed
     */
    public function isAdminAndOwner(User $user, LegalEntity $legalEntity)
    {
        return $legalEntity->user_id === $user->id && $user->role === 'admin';
    }
}

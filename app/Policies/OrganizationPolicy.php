<?php

namespace App\Policies;

use App\User;
use App\Http\Models\Organization;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrganizationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the organization.
     *
     * @param User $user
     * @return bool
     */
    public function store(User $user)
    {
        return $user->role === 'admin';
    }

    /**
     * @param User         $user
     * @param Organization $organization
     * @return mixed
     */
    public function owner(User $user, Organization $organization)
    {
        return $organization->users->find($user);
    }

    /**
     * @param User     $user
     * @param Organization $organization
     * @return mixed
     */
    public function isAdminAndOwner(User $user, Organization $organization)
    {
        return $organization->users->find($user) && $user->role === 'admin';
    }
}

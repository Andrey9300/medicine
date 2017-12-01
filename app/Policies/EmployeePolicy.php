<?php

namespace App\Policies;

use App\User;
use App\Http\Models\Employee;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmployeePolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     *
     * @return bool
     */
    public function isAdmin(User $user)
    {
        return $user->role === 'admin';
    }

    /**
     * @param User     $user
     * @param Employee $employee
     *
     * @return bool
     */
    public function isAdminAndOwner(User $user, Employee $employee)
    {
        return $user->role === 'admin' && $user->id === $employee->user_id;
    }
}

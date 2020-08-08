<?php

namespace App\Providers;

use App\Http\Models\Audits\CriterionList;
use App\Http\Models\Audits\GroupCriterion;
use App\Http\Models\Audits\PlaceCheckListCriterion;
use App\Http\Models\Audits\PlaceCheckLists;
use App\Http\Models\Audits\Units;
use App\Http\Models\Lmk\Employee;
use App\Http\Models\Lmk\Hospital;
use App\Http\Models\Lmk\Organization;
use App\Http\Models\Pest\PestLocation;
use App\Policies\CriterionListsPolicy;
use App\Policies\EmployeePolicy;
use App\Policies\GroupCriterionPolicy;
use App\Policies\HospitalPolicy;
use App\Policies\OrganizationPolicy;
use App\Policies\PestLocationPolicy;
use App\Policies\PlaceCheckListCriterionPolicy;
use App\Policies\PlaceCheckListsPolicy;
use App\Policies\UnitsPolicy;
use App\Policies\UserPolicy;
use App\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
        Organization::class => OrganizationPolicy::class,
        Hospital::class => HospitalPolicy::class,
        Employee::class => EmployeePolicy::class,
        User::class => UserPolicy::class,
        Units::class => UnitsPolicy::class,
        PlaceCheckLists::class => PlaceCheckListsPolicy::class,
        CriterionList::class => CriterionListsPolicy::class,
        GroupCriterion::class => GroupCriterionPolicy::class,
        PlaceCheckListCriterion::class => PlaceCheckListCriterionPolicy::class,
        PestLocation::class => PestLocationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}

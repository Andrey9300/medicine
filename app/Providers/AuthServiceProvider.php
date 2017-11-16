<?php

namespace App\Providers;

use App\Http\Models\Hospital;
use App\Http\Models\Organization;
use App\Policies\HospitalPolicy;
use App\Policies\OrganizationPolicy;
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

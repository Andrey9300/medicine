<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('uniqueNameAndUserId', function ($attribute, $value, $parameters, $validator) {
            $count = DB::table('hospitals')->where('name', $value)
                ->where('user_id', $parameters[0])
                ->count();

            return $count === 0;
        });

        Validator::extend('uniqueNameAndPeriodId', function ($attribute, $value, $parameters, $validator) {
            $count = DB::table('researches')->where('name', $value)
                ->where('period_id', $parameters[0])
                ->count();

            return $count === 0;
        });

        // уникальность сотрудника в пределах начальника качества
        Validator::extend('uniqueNameDateBAndDateE', function ($attribute, $value, $parameters, $validator) {
            $count = DB::table('employees')
                ->where('fio', $parameters[0])
                ->where('date_birthday', $parameters[1])
                ->where('date_employment', $parameters[2])
                ->where('user_id', $parameters[3])
                ->count();

            return $count === 0;
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
    }
}

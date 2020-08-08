<?php
Auth::routes();
Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    return "Cache is cleared";
});
Route::view('/', 'layouts.main');
Route::view('/lmk_welcome', 'layouts.lmk_welcome');

Route::get('/activateAccount/{id}/{token}', 'Auth\RegisterController@activation')->name('activation');
Route::view('/{path?}', 'layouts.app')
    ->where('path', '.*')
    ->name('react');
Route::get('/checkResearches', 'CronController@checkResearches');

// help
// php artisan make:model PestLocation -m
// php artisan make:controller PestLocationController --resource --model=Http/Models/Pest/PestLocation
// php artisan make:policy PostPolicy --model=Post

Route::middleware(['auth'])->group(function () {
    Route::prefix('users')->group(function () {
        Route::post('/store', 'UsersController@store');
        Route::post('/createAuditor', 'UsersController@createAuditor');
        Route::post('/detachAuditor/{id}', 'UsersController@detachAuditor');
        Route::post('/auditors', 'UsersController@showAuditors');
        Route::post('/current', 'UsersController@currentUser');
        Route::post('/edit/{id}', 'UsersController@update');
        Route::post('/{id}', 'UsersController@showUser');
    });

    Route::prefix('hospitals')->group(function () {
        Route::post('/researches/store/{id}', 'Lmk\HospitalController@researchesStore');
        Route::post('/researches/{id}', 'Lmk\HospitalController@researches');
        Route::post('/store', 'Lmk\HospitalController@store');
        Route::post('/destroy/{id}', 'Lmk\HospitalController@destroy');
        Route::post('/update/{id}', 'Lmk\HospitalController@update');
        Route::post('/{id}', 'Lmk\HospitalController@show');
        Route::post('/', 'Lmk\HospitalController@showAll');
    });

    Route::prefix('organizations')->group(function () {
        Route::post('/store', 'Lmk\OrganizationController@store');
        Route::post('/expired', 'Lmk\OrganizationController@expired');
        Route::post('/employeesWithCheck/{id}', 'Lmk\OrganizationController@employeesWithCheck');
        Route::post('/trashedEmployees/{id}', 'Lmk\OrganizationController@showTrashedEmployees');
        Route::post('/destroy/{id}', 'Lmk\OrganizationController@destroy');
        Route::post('/update/{id}', 'Lmk\OrganizationController@update');
        Route::post('/{id}', 'Lmk\OrganizationController@show');
        Route::post('/', 'Lmk\OrganizationController@showAll');
    });

    Route::prefix('researches')->group(function () {
        Route::post('/store', 'Lmk\ResearchController@store');
        Route::post('/destroy/{id}', 'Lmk\ResearchController@destroy');
        Route::post('/update/{id}', 'Lmk\ResearchController@update');
        Route::post('/{id}', 'Lmk\ResearchController@show');
        Route::post('/', 'Lmk\ResearchController@showAll');
    });

    Route::prefix('userResearches')->group(function () {
        Route::post('/store', 'Lmk\ResearchesController@store');
        Route::post('/destroy/{id}', 'Lmk\ResearchesController@destroy');
        Route::post('/update/{id}', 'Lmk\ResearchesController@update');
        Route::post('/{id}', 'Lmk\ResearchesController@show');
        Route::post('/', 'Lmk\ResearchesController@showAll');
    });

    Route::prefix('employees')->group(function () {
        Route::post('/withCheck', 'Lmk\EmployeesController@showAllWithCheck');
        Route::post('/store', 'Lmk\EmployeesController@store');
        Route::post('/softDelete/{id}', 'Lmk\EmployeesController@softDelete');
        Route::post('/forceDelete/{id}', 'Lmk\EmployeesController@forceDelete');
        Route::post('/restore/{id}', 'Lmk\EmployeesController@restore');
        Route::post('/update/{id}', 'Lmk\EmployeesController@update');
        Route::post('/sendToResearch/{id}', 'Lmk\EmployeesController@sendToResearch');
        Route::post('/{id}', 'Lmk\EmployeesController@show');
        Route::post('/', 'Lmk\EmployeesController@showAll');

        Route::prefix('researches')->group(function () {
            Route::post('/store/{id_employee}', 'Lmk\EmployeesController@researchesStore');
            Route::post('/{id_employee}', 'Lmk\EmployeesController@researches');
        });
    });

    Route::prefix('categories')->group(function () {
        Route::post('/', 'Lmk\CategoryController@showAll');
    });

    Route::prefix('researchPeriods')->group(function () {
        Route::post('/', 'Lmk\ResearchPeriodController@showAll');
    });

    Route::prefix('units')->group(function () {
        Route::post('/store', 'Audits\UnitController@store');
        Route::post('/destroy/{id}', 'Audits\UnitController@destroy');
        Route::post('/update/{id}', 'Audits\UnitController@update');
        Route::post('/{id}', 'Audits\UnitController@show');
        Route::post('/', 'Audits\UnitController@showAll');
    });

    Route::prefix('locations')->group(function () {
        Route::post('/store', 'Audits\LocationController@store');
        Route::post('/destroy/{id}', 'Audits\LocationController@destroy');
        Route::post('/update/{id}', 'Audits\LocationController@update');
        Route::post('/{id}', 'Audits\LocationController@show');
        Route::post('/', 'Audits\LocationController@showAll');
    });

    Route::prefix('places')->group(function () {
        Route::post('/store', 'Audits\PlaceController@store');
        Route::post('/destroy/{id}', 'Audits\PlaceController@destroy');
        Route::post('/update/{id}', 'Audits\PlaceController@update');
        Route::post('/{id}', 'Audits\PlaceController@show');
        Route::post('/', 'Audits\PlaceController@showAll');
    });

    Route::prefix('criterions')->group(function () {
        Route::post('/store', 'Audits\CriterionController@store');
        Route::post('/destroy/{id}', 'Audits\CriterionController@destroy');
        Route::post('/update/{id}', 'Audits\CriterionController@update');
        Route::post('/{id}', 'Audits\CriterionController@show');
        Route::post('/', 'Audits\CriterionController@showAll');
    });

    Route::prefix('groupCriterions')->group(function () {
        Route::post('/store', 'Audits\GroupCriterionController@store');
        Route::post('/destroy/{id}', 'Audits\GroupCriterionController@destroy');
        Route::post('/update/{id}', 'Audits\GroupCriterionController@update');
        Route::post('/{id}', 'Audits\GroupCriterionController@show');
        Route::post('/', 'Audits\GroupCriterionController@showAll');
    });

    Route::prefix('groupCriterionLists')->group(function () {
        Route::post('/store', 'Audits\GroupCriterionListController@store');
        Route::post('/destroy/{id}', 'Audits\GroupCriterionListController@destroy');
        Route::post('/update/{id}', 'Audits\GroupCriterionListController@update');
        Route::post('/{id}', 'Audits\GroupCriterionListController@show');
        Route::post('/', 'Audits\GroupCriterionListController@showAll');
    });

    Route::prefix('placeCheckLists')->group(function () {
        Route::post('/store/{id}', 'Audits\PlaceCheckListController@store');
        Route::post('/criterions/{id}', 'Audits\PlaceCheckListController@criterions');
        Route::post('/finishAudit/{id}', 'Audits\PlaceCheckListController@finishAudit');
        Route::post('/showCheckList/{id}', 'Audits\PlaceCheckListController@showCheckList');
        Route::post('/destroy/{id}', 'Audits\PlaceCheckListController@destroy');
        Route::post('/update/{id}', 'Audits\PlaceCheckListController@update');
        Route::post('/{id}', 'Audits\PlaceCheckListController@show');
        Route::post('/', 'Audits\PlaceCheckListController@showAll');
    });


    Route::prefix('pest')->group(function () {
        Route::prefix('locations')->group(function () {
            Route::post('/store', 'Pest\PestLocationController@store');
            Route::post('/destroy/{id}', 'Pest\PestLocationController@destroy');
            Route::post('/update/{id}', 'Pest\PestLocationController@update');
            Route::post('/{id}', 'Pest\PestLocationController@show');
            Route::post('/', 'Pest\PestLocationController@showAll');
        });

        Route::prefix('places')->group(function () {
            Route::post('/store', 'Pest\PestPlaceController@store');
            Route::post('/destroy/{id}', 'Pest\PestPlaceController@destroy');
            Route::post('/update/{id}', 'Pest\PestPlaceController@update');
            Route::post('/{id}', 'Pest\PestPlaceController@show');
            Route::post('/forLocation/{id}', 'Pest\PestPlaceController@showAllForLocation');
        });
        
        Route::prefix('control')->group(function () {
            Route::post('/store', 'Pest\PestControlController@store');
            Route::post('/destroy/{id}', 'Pest\PestControlController@destroy');
            Route::post('/update/{id}', 'Pest\PestControlController@update');
            Route::post('/{id}', 'Pest\PestControlController@show');
            Route::post('/forLocation/{id}', 'Pest\PestControlController@showAllForLocation');
        });
    });
});

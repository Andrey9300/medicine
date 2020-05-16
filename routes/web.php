<?php
Route::view('/welcome', 'layouts.main');

Route::get('/activateAccount/{id}/{token}', 'Auth\RegisterController@activation')->name('activation');
Route::view('/{path?}', 'layouts.app')
    ->where('path', '.*')
    ->name('react');
Auth::routes();
Route::get('/checkResearches', 'CronController@checkResearches');

Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    return "Cache is cleared";
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('users')->group(function () {
        Route::post('/store', 'UsersController@store');
        Route::post('/current', 'UsersController@currentUser');
        Route::post('/auditors', 'UsersController@showAuditors');
        Route::post('/edit/{id}', 'UsersController@update');
        Route::post('/{id}', 'UsersController@showUser');
    });

    Route::prefix('hospitals')->group(function () {
        Route::post('/researches/store/{id}', 'HospitalController@researchesStore');
        Route::post('/researches/{id}', 'HospitalController@researches');
        Route::post('/store', 'HospitalController@store');
        Route::post('/destroy/{id}', 'HospitalController@destroy');
        Route::post('/update/{id}', 'HospitalController@update');
        Route::post('/{id}', 'HospitalController@show');
        Route::post('/', 'HospitalController@showAll');
    });

    Route::prefix('organizations')->group(function () {
        Route::post('/store', 'OrganizationController@store');
        Route::post('/expired', 'OrganizationController@expired');
        Route::post('/destroy/{id}', 'OrganizationController@destroy');
        Route::post('/update/{id}', 'OrganizationController@update');
        Route::post('/{id}', 'OrganizationController@show');
        Route::post('/', 'OrganizationController@showAll');
    });

    Route::prefix('researches')->group(function () {
        Route::post('/store', 'ResearchController@store');
        Route::post('/destroy/{id}', 'ResearchController@destroy');
        Route::post('/update/{id}', 'ResearchController@update');
        Route::post('/{id}', 'ResearchController@show');
        Route::post('/', 'ResearchController@showAll');
    });

    Route::prefix('userResearches')->group(function () {
        Route::post('/store', 'UserResearchesController@store');
        Route::post('/destroy/{id}', 'UserResearchesController@destroy');
        Route::post('/update/{id}', 'UserResearchesController@update');
        Route::post('/{id}', 'UserResearchesController@show');
        Route::post('/', 'UserResearchesController@showAll');
    });

    Route::prefix('employees')->group(function () {
        Route::post('/store', 'EmployeesController@store');
        Route::post('/softDelete/{id}', 'EmployeesController@softDelete');
        Route::post('/forceDelete/{id}', 'EmployeesController@forceDelete');
        Route::post('/restore/{id}', 'EmployeesController@restore');
        Route::post('/update/{id}', 'EmployeesController@update');
        Route::post('/{id}', 'EmployeesController@show');
        Route::post('/', 'EmployeesController@showAll');

        Route::prefix('researches')->group(function () {
            Route::post('/store/{id_employee}', 'EmployeesController@researchesStore');
            Route::post('/{id_employee}', 'EmployeesController@researches');
        });
    });

    Route::prefix('categories')->group(function () {
        Route::post('/', 'CategoryController@showAll');
    });

    Route::prefix('researchPeriods')->group(function () {
        Route::post('/', 'ResearchPeriodController@showAll');
    });

    Route::prefix('units')->group(function () {
        Route::post('/store', 'UserUnitController@store');
        Route::post('/destroy/{id}', 'UserUnitController@destroy');
        Route::post('/update/{id}', 'UserUnitController@update');
        Route::post('/{id}', 'UserUnitController@show');
        Route::post('/', 'UserUnitController@showAll');
    });

    Route::prefix('locations')->group(function () {
        Route::post('/store', 'UserLocationController@store');
        Route::post('/destroy/{id}', 'UserLocationController@destroy');
        Route::post('/update/{id}', 'UserLocationController@update');
        Route::post('/{id}', 'UserLocationController@show');
        Route::post('/', 'UserLocationController@showAll');
    });

    Route::prefix('places')->group(function () {
        Route::post('/store', 'UserPlaceController@store');
        Route::post('/destroy/{id}', 'UserPlaceController@destroy');
        Route::post('/update/{id}', 'UserPlaceController@update');
        Route::post('/{id}', 'UserPlaceController@show');
        Route::post('/', 'UserPlaceController@showAll');
    });

    Route::prefix('criterions')->group(function () {
        Route::post('/store', 'UserCriterionController@store');
        Route::post('/destroy/{id}', 'UserCriterionController@destroy');
        Route::post('/update/{id}', 'UserCriterionController@update');
        Route::post('/{id}', 'UserCriterionController@show');
        Route::post('/', 'UserCriterionController@showAll');
    });

    Route::prefix('criterionLists')->group(function () {
        Route::post('/store', 'UserCriterionListController@store');
        Route::post('/destroy/{id}', 'UserCriterionListController@destroy');
        Route::post('/update/{id}', 'UserCriterionListController@update');
        Route::post('/{id}', 'UserCriterionListController@show');
        Route::post('/', 'UserCriterionListController@showAll');
    });

    Route::prefix('groupCriterions')->group(function () {
        Route::post('/store', 'UserGroupCriterionController@store');
        Route::post('/destroy/{id}', 'UserGroupCriterionController@destroy');
        Route::post('/update/{id}', 'UserGroupCriterionController@update');
        Route::post('/{id}', 'UserGroupCriterionController@show');
        Route::post('/', 'UserGroupCriterionController@showAll');
    });

    Route::prefix('groupCriterionLists')->group(function () {
        Route::post('/store', 'UserGroupCriterionListController@store');
        Route::post('/destroy/{id}', 'UserGroupCriterionListController@destroy');
        Route::post('/update/{id}', 'UserGroupCriterionListController@update');
        Route::post('/{id}', 'UserGroupCriterionListController@show');
        Route::post('/', 'UserGroupCriterionListController@showAll');
    });

    Route::prefix('placeCheckLists')->group(function () {
        Route::post('/store/{id}', 'PlaceCheckListController@store');
        Route::post('/criterions/{id}', 'PlaceCheckListController@criterions');
        Route::post('/destroy/{id}', 'PlaceCheckListController@destroy');
        Route::post('/update/{id}', 'PlaceCheckListController@update');
        Route::post('/{id}', 'PlaceCheckListController@show');
        Route::post('/', 'PlaceCheckListController@showAll');
    });
});

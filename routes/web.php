<?php
Route::view('/welcome', 'layouts.main');
Route::get('/activateAccount/{id}/{token}', 'Auth\RegisterController@activation')->name('activation');
Route::view('/{path?}', 'layouts.app')
    ->where('path', '.*')
    ->name('react');
Auth::routes();
Route::get('/checkResearches', 'CronController@checkResearches');

Route::middleware(['auth'])->group(function () {
    Route::post('users/current', 'UsersController@show');

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
});

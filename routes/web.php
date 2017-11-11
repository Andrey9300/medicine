<?php
Auth::routes();
Route::get('/', 'IndexController@index');

Route::middleware(['auth'])->group(function () {
    Route::prefix('hospitals')->group(function () {
        Route::post('/create', 'HospitalController@create');
        Route::post('/destroy/{id}', 'HospitalController@destroy');
        Route::post('/update/{id}', 'HospitalController@update');
        Route::post('/{id}', 'HospitalController@show');
        Route::post('/', 'HospitalController@store');

        Route::prefix('researches')->group(function () {
            Route::post('/create/{id_hospital}', 'HospitalController@createResearch');
            Route::post('/destroy/{id_hospital}/{id_research}', 'HospitalController@destroyResearch');
            Route::post('/update/{id_hospital}/{id_research}', 'HospitalController@updateResearch');
            Route::post('/edit/{id_hospital}/{id_research}', 'HospitalController@editResearch');
            Route::post('/{id_hospital}', 'HospitalController@storeResearches');
        });
    });

    Route::prefix('organizations')->group(function () {
        Route::post('/create', 'OrganizationController@create');
        Route::post('/destroy/{id}', 'OrganizationController@destroy');
        Route::post('/update/{id}', 'OrganizationController@update');
        Route::post('/{id}', 'OrganizationController@show');
        Route::post('/', 'OrganizationController@store');
        Route::prefix('users')->group(function () {
            Route::post('/{id_organization}', 'OrganizationController@storeUsers');
            Route::get('/{id_organization}', 'OrganizationController@storeUsers');
        });
    });

    Route::prefix('researches')->group(function () {
        Route::post('/create', 'ResearchController@create');
        Route::post('/destroy/{id}', 'ResearchController@destroy');
        Route::post('/update/{id}', 'ResearchController@update');
        Route::get('/showHospitals/{id}', 'ResearchController@showHospitals');
        Route::post('/{id}', 'ResearchController@show');
        Route::post('/', 'ResearchController@store');
    });

    Route::prefix('users')->group(function () {
        Route::post('/create', 'UsersController@create');
        Route::post('/destroy/{id}', 'UsersController@destroy');
        Route::post('/update/{id}', 'UsersController@update');
        Route::post('/{id}', 'UsersController@show');
        Route::get('/{id}', 'UsersController@show');
        Route::post('/', 'UsersController@store');

        Route::prefix('researches')->group(function () {
            Route::post('/create/{id_user}', 'UsersController@createResearch');
            Route::post('/destroy/{id_user}/{id_research}', 'UsersController@destroyResearch');
            Route::post('/update/{id_user}/{id_research}', 'UsersController@updateResearch');
            Route::post('/edit/{id_user}/{id_research}', 'UsersController@editResearch');
            Route::post('/{id_user}', 'UsersController@storeResearches');
        });
    });
});

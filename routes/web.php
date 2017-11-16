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
        Route::prefix('employees')->group(function () {
            Route::post('/create/{id_organization}', 'OrganizationController@createEmployee');
            Route::post('/{id_organization}', 'OrganizationController@storeEmployees');
            Route::get('/{id_organization}', 'OrganizationController@storeEmployees');
        });
    });

    Route::prefix('researches')->group(function () {
        Route::post('/create', 'ResearchController@create');
        Route::post('/destroy/{id}', 'ResearchController@destroy');
        Route::post('/update/{id}', 'ResearchController@update');
        Route::get('/showHospitals/{id}', 'ResearchController@showHospitals');
        Route::post('/onCategories', 'ResearchController@onCategories');
        Route::post('/{id}', 'ResearchController@show');
        Route::post('/', 'ResearchController@store');
    });

    Route::prefix('employees')->group(function () {
        Route::post('/create', 'EmployeesController@create');
        Route::post('/destroy/{id}', 'EmployeesController@destroy');
        Route::post('/update/{id}', 'EmployeesController@update');
        Route::post('/{id}', 'EmployeesController@show');
        Route::get('/{id}', 'EmployeesController@show');
        Route::post('/', 'EmployeesController@store');

        Route::prefix('researches')->group(function () {
            Route::post('/create/{id_employee}', 'EmployeesController@createResearch');
            Route::post('/destroy/{id_employee}/{id_research}', 'EmployeesController@destroyResearch');
            Route::post('/update/{id_employee}/{id_research}', 'EmployeesController@updateResearch');
            Route::post('/edit/{id_employee}/{id_research}', 'EmployeesController@editResearch');
            Route::post('/{id_employee}', 'EmployeesController@storeResearches');
        });
    });

    Route::prefix('regions')->group(function () {
        Route::post('/', 'RegionController@store');
    });

    Route::prefix('categories')->group(function () {
        Route::post('/', 'CategoryController@store');
    });
});

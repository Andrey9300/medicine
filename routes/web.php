<?php
Auth::routes();
Route::get('/', 'IndexController@index');

Route::middleware(['auth'])->group(function () {
    Route::prefix('legalEntities')->group(function () {
        Route::post('/store', 'LegalEntityController@store');
        Route::post('/destroy/{id}', 'LegalEntityController@destroy');
        Route::post('/update/{id}', 'LegalEntityController@update');
        Route::post('/{id}', 'LegalEntityController@show');
        Route::post('/', 'LegalEntityController@showAll');
    });

    Route::prefix('hospitals')->group(function () {
        Route::post('/store', 'HospitalController@store');
        Route::post('/destroy/{id}', 'HospitalController@destroy');
        Route::post('/update/{id}', 'HospitalController@update');
        Route::post('/{id}', 'HospitalController@show');
        Route::post('/', 'HospitalController@showAll');

        Route::prefix('researches')->group(function () {
            Route::post('/store/{id_hospital}', 'HospitalController@storeResearch');
            Route::post('/destroy/{id_hospital}/{id_research}', 'HospitalController@destroyResearch');
            Route::post('/update/{id_hospital}/{id_research}', 'HospitalController@updateResearch');
            Route::post('/edit/{id_hospital}/{id_research}', 'HospitalController@editResearch');
            Route::post('/{id_hospital}', 'HospitalController@showAllResearches');
        });
    });

    Route::prefix('organizations')->group(function () {
        Route::post('/store', 'OrganizationController@store');
        Route::post('/destroy/{id}', 'OrganizationController@destroy');
        Route::post('/update/{id}', 'OrganizationController@update');
        Route::post('/{id}', 'OrganizationController@show');
        Route::post('/', 'OrganizationController@showAll');
        Route::prefix('employees')->group(function () {
            Route::post('/store/{id_organization}', 'OrganizationController@storeEmployee');
            Route::post('/{id_organization}', 'OrganizationController@showAllEmployees');
        });
    });

    Route::prefix('researches')->group(function () {
        Route::post('/store', 'ResearchController@store');
        Route::post('/destroy/{id}', 'ResearchController@destroy');
        Route::post('/update/{id}', 'ResearchController@update');
        Route::get('/showHospitals/{id}', 'ResearchController@showHospitals');
        Route::post('/onCategories', 'ResearchController@onCategories');
        Route::post('/{id}', 'ResearchController@show');
        Route::post('/', 'ResearchController@showAll');
    });

    Route::prefix('employees')->group(function () {
        Route::post('/store', 'EmployeesController@store');
        Route::post('/softDelete/{id}', 'EmployeesController@softDelete');
        Route::post('/forceDelete/{id}', 'EmployeesController@forceDelete');
        Route::post('/update/{id}', 'EmployeesController@update');
        Route::post('/{id}', 'EmployeesController@show');
        Route::post('/', 'EmployeesController@showAll');

        Route::prefix('researches')->group(function () {
            Route::post('/store/{id_employee}', 'EmployeesController@storeResearch');
            Route::post('/destroy/{id_employee}/{id_research}', 'EmployeesController@destroyResearch');
            Route::post('/update/{id_employee}/{id_research}', 'EmployeesController@updateResearch');
            Route::post('/edit/{id_employee}/{id_research}', 'EmployeesController@editResearch');
            Route::post('/{id_employee}', 'EmployeesController@showAllResearches');
        });
    });

    Route::prefix('regions')->group(function () {
        Route::post('/', 'RegionController@showAll');
    });

    Route::prefix('categories')->group(function () {
        Route::post('/', 'CategoryController@showAll');
    });

    Route::prefix('researchPeriods')->group(function () {
        Route::post('/', 'ResearchPeriodController@showAll');
    });
});

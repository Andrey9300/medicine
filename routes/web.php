<?php
Auth::routes();
Route::get('/', 'HomeController@index')->name('home');

 Route::middleware(['auth'])->group(function () {
    Route::prefix('hospitals')->group(function () {
        Route::post('/create', 'HospitalController@create');
        Route::post('/edit/{id}', 'HospitalController@edit');
        Route::post('/destroy/{id}', 'HospitalController@destroy');
        Route::post('/update/{id}', 'HospitalController@update');
        Route::get('/showResearches/{id}', 'HospitalController@showResearches');
        Route::post('/{id}', 'HospitalController@show');
        Route::post('/', 'HospitalController@store');
    });

     Route::prefix('organizations')->group(function () {
         Route::post('/create', 'OrganizationController@create');
         Route::post('/edit/{id}', 'OrganizationController@edit');
         Route::post('/destroy/{id}', 'OrganizationController@destroy');
         Route::post('/update/{id}', 'OrganizationController@update');
         Route::post('/{id}', 'OrganizationController@show');
         Route::post('/', 'OrganizationController@store');
     });

     Route::prefix('researches')->group(function () {
         Route::post('/create', 'ResearchController@create');
         Route::post('/edit/{id}', 'ResearchController@edit');
         Route::post('/destroy/{id}', 'ResearchController@destroy');
         Route::post('/update/{id}', 'ResearchController@update');
         Route::get('/showHospitals/{id}', 'ResearchController@showHospitals');
         Route::post('/{id}', 'ResearchController@show');
         Route::post('/', 'ResearchController@store');
     });
     
    //Route::resource('employees', 'EmployeeController');
    //Route::resource('researches', 'ResearchController');
    //Route::resource('organizations', 'OrganizationController');
});



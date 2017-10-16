<?php
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::resource('hospital', 'HospitalController');
    Route::resource('employee', 'EmployeeController');
    Route::resource('research', 'ResearchController');
    Route::resource('organizations', 'O rganizationController');
});

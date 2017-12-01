<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeResearch extends Model
{
    public $timestamps = false;

    protected $table = 'employee_research';

    protected $dates = ['date'];

    protected $fillable = [
        'user_researches_id', 'employee_id', 'date'
    ];
}

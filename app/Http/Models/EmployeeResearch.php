<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeResearch extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_researches_id', 'employee_id', 'date', 'is_exception'
    ];
}

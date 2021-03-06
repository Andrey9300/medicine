<?php

namespace App\Http\Models\Lmk;

use Illuminate\Database\Eloquent\Model;

class EmployeeResearch extends Model
{
    public $timestamps = false;

    protected $table = 'employee_researches';

    protected $fillable = [
        'user_researches_id', 'employee_id', 'date', 'is_exception'
    ];
}

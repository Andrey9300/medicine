<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    /**
     * Обследования, принадлежащие сотруднику.
     */
    public function researches()
    {
        return $this->belongsToMany('App\Research');
    }
}

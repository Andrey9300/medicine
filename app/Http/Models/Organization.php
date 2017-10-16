<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    /**
     * Получить орагиназцию сотрудника.
     */
    public function employees()
    {
        return $this->hasMany('App\Employee');
    }
}

<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public $timestamps = false;

    /**
     * Получить орагиназцию сотрудника.
     */
    public function users()
    {
        return $this->hasMany('App\User', 'organization_name', 'name');
    }
}

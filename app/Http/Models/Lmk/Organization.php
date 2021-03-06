<?php

namespace App\Http\Models\Lmk;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public $timestamps = false;

    /**
     * Категория организации
     */
    public function category()
    {
        return $this->belongsTo('App\Http\Models\Lmk\Category');
    }

    /**
     * Users организации
     */
    public function users()
    {
        return $this->belongsToMany('App\User', 'user_organization');
    }

    public function auditors()
    {
        return $this->belongsToMany('App\User', 'user_organization')->where('role', '=', 'auditor');
    }

    /**
     * Employees организации
     */
    public function employees()
    {
        return $this->hasMany('App\Http\Models\Lmk\Employee', 'organization_name', 'name');
    }
}

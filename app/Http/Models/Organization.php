<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public $timestamps = false;

    /**
     * Категория организации
     */
    public function category()
    {
        return $this->belongsTo('App\Http\Models\Category');
    }

    /**
     * Регион организации
     */
    public function region()
    {
        return $this->belongsTo('App\Http\Models\Region');
    }

    /**
     * Юридическое лицо организации
     */
    public function legal_entity()
    {
        return $this->belongsTo('App\Http\Models\LegalEntity');
    }

    /**
     * Users организации
     */
    public function users()
    {
        return $this->belongsToMany('App\User', 'user_organization');
    }

    /**
     * Employees организации
     */
    public function employees()
    {
        return $this->hasMany('App\Http\Models\Employee', 'organization_name', 'name');
    }
}

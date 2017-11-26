<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public $timestamps = false;

    /**
     * категория
     */
    public function category()
    {
        return $this->belongsTo('App\Http\Models\Category');
    }

    /**
     * регион
     */
    public function region()
    {
        return $this->belongsTo('App\Http\Models\Region');
    }

    /**
     * юридическое лицо
     */
    public function legal_entity()
    {
        return $this->belongsTo('App\Http\Models\LegalEntity');
    }

    /**
     * получить users организации
     */
    public function users()
    {
        return $this->belongsToMany('App\User', 'user_organization');
    }

    /**
     * получить employees организации
     */
    public function employees()
    {
        return $this->hasMany('App\Http\Models\Employee', 'organization_name', 'name');
    }
}

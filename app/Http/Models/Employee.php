<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    public $timestamps = false;

    /**
     * получить организацию сотрудника
     */
    public function organization()
    {
        return $this->belongsTo('App\Http\Models\organization', 'organization_name', 'name');
    }

    /**
     * The roles that belong to the user.
     */
    public function researches()
    {
        return $this->belongsToMany('App\Http\Models\Research')->withPivot('id', 'date');
    }
}

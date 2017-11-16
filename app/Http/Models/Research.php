<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    public $timestamps = false;

    /**
     * период
     */
    public function researchPeriod()
    {
        return $this->hasOne('App\Http\Models\ResearchPeriod', 'id', 'period_id');
    }

    /**
     * Сотрудники, имеющие исследование.
     */
    public function employees()
    {
        return $this->belongsToMany('Employees');
    }

    /**
     * Медицинские учреждение, имеющие исследование.
     */
    public function hospitals()
    {
        return $this->belongsToMany('App\Http\Models\Hospital');
    }
}

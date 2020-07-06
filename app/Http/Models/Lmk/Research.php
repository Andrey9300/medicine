<?php

namespace App\Http\Models\Lmk;

use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    public $timestamps = false;

    /**
     * Период исследования
     */
    public function researchPeriod()
    {
        return $this->hasOne('App\Http\Models\Lmk\ResearchPeriod', 'id', 'period_id');
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
        return $this->belongsToMany('App\Http\Models\Lmk\Hospital');
    }
}

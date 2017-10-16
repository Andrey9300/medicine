<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    /**
     * Сотрудники, имеющие исследование.
     */
    public function users()
    {
        return $this->belongsToMany('App\Employee');
    }
}

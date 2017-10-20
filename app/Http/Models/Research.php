<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    public $timestamps = false;

    /**
     * Сотрудники, имеющие исследование.
     */
    public function users()
    {
        return $this->belongsToMany('User');
    }

    /**
     * Медицинские учреждение, имеющие исследование.
     */
    public function hospitals()
    {
        return $this->belongsToMany('App\Http\Models\Hospital');
    }
}

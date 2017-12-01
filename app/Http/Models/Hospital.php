<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    public $timestamps = false;

    /**
     * Регион
     */
    public function region()
    {
        return $this->belongsTo('App\Http\Models\Region');
    }
}

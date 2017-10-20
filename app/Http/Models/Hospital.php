<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    public $timestamps = false;

    /**
     * The roles that belong to the user.
     */
    public function researches()
    {
        return $this->belongsToMany('App\Http\Models\Research');
    }
}

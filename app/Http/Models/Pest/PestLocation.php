<?php

namespace App\Http\Models\Pest;

use Illuminate\Database\Eloquent\Model;

class PestLocation extends Model
{
    public $timestamps = false;

    public function places()
    {
        return $this->hasMany('App\Http\Models\Pest\PestPlace', 'location_id');
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'pest_user_locations', 'location_id', 'user_id');
    }
}

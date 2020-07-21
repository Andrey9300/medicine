<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class Units extends Model
{
    public $timestamps = false;

    protected $table = 'audits_units';

    protected $fillable = ['name'];

    public function locations()
    {
        return $this->hasMany('App\Http\Models\Audits\Location');
    }

    public function location($id)
    {
        return $this->hasOne('App\Http\Models\Audits\Location')->where('id', '=', $id);
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_units', 'unit_id', 'user_id');
    }
}

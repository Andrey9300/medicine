<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    public $timestamps = false;

    protected $table = 'audits_locations';

    protected $fillable = [
        'name', 'unit_id'
    ];

    public function places()
    {
        return $this->hasMany('App\Http\Models\Audits\Place');
    }

    public function place($id)
    {
        return $this->hasOne('App\Http\Models\Audits\Place')->where('id', '=', $id);
    }
}

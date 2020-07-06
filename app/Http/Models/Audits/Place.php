<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    public $timestamps = false;

    protected $table = 'audits_places';

    protected $fillable = [
        'name', 'location_id'
    ];
}

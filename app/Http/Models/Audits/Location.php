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
}

<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class Units extends Model
{
    public $timestamps = false;

    protected $table = 'audits_units';

    protected $fillable = [
        'name', 'user_id'
    ];
}

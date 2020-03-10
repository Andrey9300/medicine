<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class UserCriterions extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name', 'user_id'
    ];
}

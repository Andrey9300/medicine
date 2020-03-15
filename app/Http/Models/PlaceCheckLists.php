<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class PlaceCheckLists extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_criterion_lists_id', 'created_at', 'sended',
    ];
}

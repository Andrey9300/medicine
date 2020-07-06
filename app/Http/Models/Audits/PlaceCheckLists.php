<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class PlaceCheckLists extends Model
{
    public $timestamps = false;

    protected $table = 'audits_place_check_lists';

    protected $fillable = [
        'criterion_lists_id', 'created_at', 'sended', 'user_id'
    ];
}

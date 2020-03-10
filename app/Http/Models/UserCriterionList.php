<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class UserCriterionList extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'unit_id', 'location_id', 'place_id', '	user_group_criterion_id', 'user_id'
    ];
}

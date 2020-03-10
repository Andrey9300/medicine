<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class UserGroupCriterion extends Model
{
    public $timestamps = false;

    protected $table = 'user_group_criterion';

    protected $fillable = [
        'name', 'user_id'
    ];
}

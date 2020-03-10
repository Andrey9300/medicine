<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class UserGroupCriterionList extends Model
{
    public $timestamps = false;

    protected $table = 'user_group_criterion_list';

    protected $fillable = [
        'user_group_criterion_id', 'user_criterions_criterion_id', 'user_id'
    ];
}

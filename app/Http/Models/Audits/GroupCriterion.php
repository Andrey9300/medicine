<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class GroupCriterion extends Model
{
    public $timestamps = false;

    protected $table = 'audits_group_criterion';

    protected $fillable = [
        'name', 'user_id'
    ];
}

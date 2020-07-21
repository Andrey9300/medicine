<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class GroupCriterionList extends Model
{
    public $timestamps = false;

    protected $table = 'audits_group_criterion_list';

    protected $fillable = ['group_criterion_id', 'criterions_criterion_id'];
}

<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class CriterionList extends Model
{
    public $timestamps = false;

    protected $table = 'audits_criterion_lists';

    protected $fillable = [
        'unit_id', 'location_id', 'place_id', '	group_criterion_id', 'user_id'
    ];
}

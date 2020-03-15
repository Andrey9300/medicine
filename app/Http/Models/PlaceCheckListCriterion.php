<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class PlaceCheckListCriterion extends Model
{
    public $timestamps = false;

    protected $table = 'place_check_list_criterion';

    protected $fillable = [
        'place_check_lists_id', 'user_criterions_id', 'mark', 'comment_from_auditor', 'comment_at_auditor',
    ];
}

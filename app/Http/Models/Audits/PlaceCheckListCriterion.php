<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class PlaceCheckListCriterion extends Model
{
    public $timestamps = false;

    protected $table = 'audits_place_check_list_criterion';

    protected $fillable = [
        'place_check_lists_id', 'criterions_id', 'mark', 'comment_from_auditor', 'comment_at_auditor',
    ];

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_place_check_list_criterion', 'list_id', 'user_id');
    }
}

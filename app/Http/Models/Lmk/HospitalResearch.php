<?php

namespace App\Http\Models\Lmk;

use Illuminate\Database\Eloquent\Model;

class HospitalResearch extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_researches_id', 'hospital_id', 'price'
    ];
}

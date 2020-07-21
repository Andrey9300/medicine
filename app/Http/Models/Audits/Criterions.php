<?php

namespace App\Http\Models\Audits;

use Illuminate\Database\Eloquent\Model;

class Criterions extends Model
{
    public $timestamps = false;

    protected $table = 'audits_criterions';

    protected $fillable = ['name'];
}

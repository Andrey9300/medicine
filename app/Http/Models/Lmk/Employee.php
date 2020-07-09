<?php

namespace App\Http\Models\Lmk;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public $timestamps = false;

    /**
     * Получить организацию сотрудника
     */
    public function organization()
    {
        return $this->belongsTo('App\Http\Models\Lmk\Organization', 'organization_name', 'name');
    }

    public function category()
    {
        return $this->belongsTo('App\Http\Models\Lmk\Category');
    }
}
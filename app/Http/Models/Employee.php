<?php

namespace App\Http\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    /**
     * Атрибуты, которые должны быть преобразованы в даты.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public $timestamps = false;

    /**
     * получить организацию сотрудника
     */
    public function organization()
    {
        return $this->belongsTo('App\Http\Models\Organization', 'organization_name', 'name');
    }

    /**
     * The roles that belong to the user.
     */
    public function researches()
    {
        return $this->belongsToMany('App\Http\Models\Research')->withPivot('id', 'date');
    }
}

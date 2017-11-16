<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchCategory extends Model
{
    public $timestamps = false;
    // TODO research_categories для laravel
    protected $table = 'research_category';

    /**
     * регион
     */
    public function category()
    {
        return $this->belongsTo('App\Http\Models\Region');
    }

    /**
     * The roles that belong to the user.
     */
    public function research()
    {
        return $this->belongsTo('App\Http\Models\Research');
    }
}

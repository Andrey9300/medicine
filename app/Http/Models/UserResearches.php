<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class UserResearches extends Model
{
    public $timestamps = false;

    protected $table = 'user_researches';

    protected $fillable = [
        'research_categories_id', 'user_id'
    ];

    /**
     * Исследования, привязанные по категориям
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories()
    {
        return $this->hasMany('App\Http\Models\ResearchCategory');
    }
}

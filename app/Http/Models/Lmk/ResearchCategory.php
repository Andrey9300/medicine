<?php

namespace App\Http\Models\Lmk;

use Illuminate\Database\Eloquent\Model;

class ResearchCategory extends Model
{
    public $timestamps = false;

    /**
     * Категория исследования
     */
    public function category()
    {
        return $this->belongsTo('App\Http\Models\Lmk\Category');
    }

    /**
     * Исследование
     */
    public function research()
    {
        return $this->belongsTo('App\Http\Models\Lmk\Research');
    }
}

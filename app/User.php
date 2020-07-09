<?php

namespace App;

use App\Notifications\ResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'fio', 'email', 'password', 'role', 'active'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];

    public $timestamps = false;

    /**
     * Send the password reset notification.
     *
     * @param string $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    /**
     * Все организации user
     */
    public function organizations()
    {
        return $this->belongsToMany('App\Http\Models\Lmk\Organization', 'user_organization');
    }

    /**
     * Все медицинские организации user
     */
    public function hospitals()
    {
        return $this->hasMany('App\Http\Models\Lmk\Hospital');
    }

    /**
     * Все сотрудинки user
     */
    public function employees()
    {
        return $this->hasMany('App\Http\Models\Lmk\Employee');
    }

    /**
     * Все исследования user
     */
    public function researches()
    {
        return $this->belongsToMany('App\Http\Models\Lmk\ResearchCategory', 'user_researches', 'user_id', 'research_categories_id')->withPivot('id', 'research_categories_id');
    }

    public function criterions()
    {
        return $this->hasMany('App\Http\Models\Audits\Criterions');
    }

    public function criterion($id)
    {
        return $this->hasOne('App\Http\Models\Audits\Criterions')->where('id', '=', $id);
    }

    public function units()
    {
        return $this->hasMany('App\Http\Models\Audits\Units');
    }

    public function unit($id)
    {
        return $this->hasOne('App\Http\Models\Audits\Units')->where('id', '=', $id);
    }

    public function criterionLists()
    {
        return $this->hasMany('App\Http\Models\Audits\CriterionList');
    }

    public function criterionList($id)
    {
        return $this->hasOne('App\Http\Models\Audits\CriterionList')->where('id', '=', $id);
    }

    public function groupCriterions()
    {
        return $this->hasMany('App\Http\Models\Audits\GroupCriterion');
    }

    public function groupCriterion($id)
    {
        return $this->hasOne('App\Http\Models\Audits\GroupCriterion')->where('id', '=', $id);
    }

    public function groupCriterionLists()
    {
        return $this->hasMany('App\Http\Models\Audits\GroupCriterionList');
    }

    public function groupCriterionList($id)
    {
        return $this->hasOne('App\Http\Models\Audits\GroupCriterionList')->where('id', '=', $id);
    }
}

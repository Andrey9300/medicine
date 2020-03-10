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
        return $this->belongsToMany('App\Http\Models\Organization', 'user_organization');
    }

    /**
     * Все медицинские организации user
     */
    public function hospitals()
    {
        return $this->hasMany('App\Http\Models\Hospital');
    }

    /**
     * Все сотрудинки user
     */
    public function employees()
    {
        return $this->hasMany('App\Http\Models\Employee');
    }

    /**
     * Все исследования user
     */
    public function researches()
    {
        return $this->belongsToMany('App\Http\Models\ResearchCategory', 'user_researches', 'user_id', 'research_categories_id')->withPivot('id', 'research_categories_id');
    }

    public function criterions()
    {
        return $this->hasMany('App\Http\Models\UserCriterions');
    }

    public function criterion($id)
    {
        return $this->hasOne('App\Http\Models\UserCriterions')->where('id', '=', $id);
    }

    public function units()
    {
        return $this->hasMany('App\Http\Models\UserUnits');
    }

    public function unit($id)
    {
        return $this->hasOne('App\Http\Models\UserUnits')->where('id', '=', $id);
    }

    public function locations()
    {
        return $this->hasMany('App\Http\Models\UserLocation');
    }

    public function location($id)
    {
        return $this->hasOne('App\Http\Models\UserLocation')->where('id', '=', $id);
    }

    public function places()
    {
        return $this->hasMany('App\Http\Models\UserPlace');
    }

    public function place($id)
    {
        return $this->hasOne('App\Http\Models\UserPlace')->where('id', '=', $id);
    }

    public function criterionLists()
    {
        return $this->hasMany('App\Http\Models\UserCriterionList');
    }

    public function criterionList($id)
    {
        return $this->hasOne('App\Http\Models\UserCriterionList')->where('id', '=', $id);
    }

    public function groupCriterions()
    {
        return $this->hasMany('App\Http\Models\UserGroupCriterion');
    }

    public function groupCriterion($id)
    {
        return $this->hasOne('App\Http\Models\UserGroupCriterion')->where('id', '=', $id);
    }

    public function groupCriterionLists()
    {
        return $this->hasMany('App\Http\Models\UserGroupCriterionList');
    }

    public function groupCriterionList($id)
    {
        return $this->hasOne('App\Http\Models\UserGroupCriterionList')->where('id', '=', $id);
    }
}

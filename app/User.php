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
        return $this->hasMany('App\Http\Models\Lmk\UserCriterions');
    }

    public function criterion($id)
    {
        return $this->hasOne('App\Http\Models\Lmk\UserCriterions')->where('id', '=', $id);
    }

    public function units()
    {
        return $this->hasMany('App\Http\Models\Lmk\UserUnits');
    }

    public function unit($id)
    {
        return $this->hasOne('App\Http\Models\Lmk\UserUnits')->where('id', '=', $id);
    }

    public function locations()
    {
        return $this->hasMany('App\Http\Models\Lmk\UserLocation');
    }

    public function location($id)
    {
        return $this->hasOne('App\Http\Models\Lmk\UserLocation')->where('id', '=', $id);
    }

    public function places()
    {
        return $this->hasMany('App\Http\Models\Lmk\UserPlace');
    }

    public function place($id)
    {
        return $this->hasOne('App\Http\Models\Lmk\UserPlace')->where('id', '=', $id);
    }

    public function criterionLists()
    {
        return $this->hasMany('App\Http\Models\Lmk\UserCriterionList');
    }

    public function criterionList($id)
    {
        return $this->hasOne('App\Http\Models\Lmk\UserCriterionList')->where('id', '=', $id);
    }

    public function groupCriterions()
    {
        return $this->hasMany('App\Http\Models\Lmk\UserGroupCriterion');
    }

    public function groupCriterion($id)
    {
        return $this->hasOne('App\Http\Models\Lmk\UserGroupCriterion')->where('id', '=', $id);
    }

    public function groupCriterionLists()
    {
        return $this->hasMany('App\Http\Models\Lmk\UserGroupCriterionList');
    }

    public function groupCriterionList($id)
    {
        return $this->hasOne('App\Http\Models\Lmk\UserGroupCriterionList')->where('id', '=', $id);
    }
}

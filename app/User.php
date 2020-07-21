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
        return $this->belongsToMany('App\Http\Models\Audits\Criterions',  'user_criterions', 'user_id', 'criterion_id');
    }

    public function criterion($id)
    {
        return $this->belongsToMany('App\Http\Models\Audits\Criterions',  'user_criterions', 'user_id', 'criterion_id')->where('id', '=', $id);
    }

    public function units()
    {
        return $this->belongsToMany('App\Http\Models\Audits\Units', 'user_units', 'user_id', 'unit_id');
    }

    public function unit($id)
    {
        return $this->hasOne('App\Http\Models\Audits\Units')->where('id', '=', $id);
    }

    public function criterionLists()
    {
        return $this->belongsToMany('App\Http\Models\Audits\CriterionList', 'user_criterion_lists', 'user_id', 'lists_id');
    }

    public function criterionList($id)
    {
        return $this->hasOne('App\Http\Models\Audits\CriterionList')->where('id', '=', $id);
    }

    public function groupCriterions()
    {
        return $this->belongsToMany('App\Http\Models\Audits\GroupCriterion', 'user_group_criterion', 'user_id', 'group_criterion_id');
    }

    public function groupCriterion($id)
    {
        return $this->hasOne('App\Http\Models\Audits\GroupCriterion')->where('id', '=', $id);
    }

    public function groupCriterionLists()
    {
        return $this->belongsToMany('App\Http\Models\Audits\GroupCriterionList', 'user_group_criterion_list', 'user_id', 'group_criterion_list_id');
    }

    public function groupCriterionList($id)
    {
        return $this->belongsToMany('App\Http\Models\Audits\GroupCriterionList', 'user_group_criterion_list', 'user_id', 'group_criterion_list_id')->where('id', '=', $id);
    }

    public function placeCheckLists()
    {
        return $this->belongsToMany('App\Http\Models\Audits\PlaceCheckLists', 'user_place_check_lists', 'user_id', 'lists_id');
    }

    public function placeCheckListCriterion()
    {
        return $this->belongsToMany('App\Http\Models\Audits\PlaceCheckListCriterion', 'user_place_check_list_criterion', 'user_id', 'list_id');
    }
}

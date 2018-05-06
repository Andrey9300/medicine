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
     * @param  string  $token
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

}

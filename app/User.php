<?php

namespace App;

use App\Notifications\ResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fio', 'email', 'password', 'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
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
     * все организации user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function organizations()
    {
        return $this->belongsToMany('App\Http\Models\Organization', 'user_organization');
    }

    /**
     * все медицинские организации user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function hospitals()
    {
        return $this->hasMany('App\Http\Models\Hospital');
    }

    /**
     * все юридические лица user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function legal_entities()
    {
        return $this->hasMany('App\Http\Models\LegalEntity');
    }
}

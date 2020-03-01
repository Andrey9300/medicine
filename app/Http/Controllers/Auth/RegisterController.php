<?php

namespace App\Http\Controllers\Auth;

use App\Http\Models\ResearchCategory;
use App\Http\Models\UserResearches;
use App\Notifications\ActivateAccount;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/login';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'fio' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $newUser = User::create([
            'fio' => $data['fio'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $newUser->notify(new ActivateAccount($newUser));

        $researchCategories = ResearchCategory::all();

        foreach ($researchCategories as $researchCategory) {
            UserResearches::firstOrCreate([
                'research_categories_id' => $researchCategory->id,
                'user_id' => $newUser->id
            ]);
        }

        return $newUser;
    }

    /**
     * Make user activation.
     */
    protected function activation($userId, $token)
    {
        $user = User::findOrFail($userId);

        if (md5($user->email) === $token) {
            $user->active = 1;
            $user->save();

            Auth::login($user, true);

            return redirect('/activateAccount');
        }
    }
}

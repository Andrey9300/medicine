<?php

namespace App\Http\Controllers;

use App\Http\Models\Organization;
use App\Http\Models\Research;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    /**
     * Создать пользователя
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $user = new User;
        $user->fio = $request->fio;
        $user->password = bcrypt($request->password);
        $user->date_birthday = $request->date_birthday;
        $user->date_employment = $request->date_employment;
        $user->medical_book = $request->medical_book;
        $user->role = $request->role;
        $user->email = $request->email;
        $user->organization_name = $request->organization_name;
        $user->save();
    }

    /**
     * Получить данные пользователя
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        return response()->json([
            'user' => Auth::user()
        ]);
    }

    /**
     * Обновить пользователя
     *
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->fio = $request->fio;
        $user->password = bcrypt($request->password);
        $user->date_birthday = $request->date_birthday;
        $user->date_employment = $request->date_employment;
        $user->medical_book = $request->medical_book;
        $user->role = $request->role;
        $user->email = $request->email;
        $user->organization_name = $request->organization_name;
        $user->save();
    }

    /**
     * Удалить пользователя
     *
     * @param int $id
     * @return void
     */
    public function destroy($id)
    {
        User::destroy($id);
    }
}

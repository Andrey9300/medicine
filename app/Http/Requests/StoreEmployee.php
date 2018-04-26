<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreEmployee extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('isAdmin', User::class);
    }

    public function rules()
    {
        $request = $this->validationData();
        return [
            'fio' => "required|max:255|uniqueNameDateBAndDateE:" .
                $request['fio'] .
                "," . $request['date_birthday'] .
                ',' . $request['date_employment'] .
                ',' . $this->user()->id,
            'date_birthday' => 'date_format:"d-m-Y"|required',
            'date_employment' => 'date_format:"d-m-Y"|required',
            'medical_book' => "max:255",
        ];
    }
}

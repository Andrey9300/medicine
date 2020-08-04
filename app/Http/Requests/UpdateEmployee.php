<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployee extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fio' => "max:255",
            'date_birthday' => 'date_format:"d-m-Y"',
            'date_employment' => 'date_format:"d-m-Y"',
            'medical_book' => "max:255",
        ];
    }
}

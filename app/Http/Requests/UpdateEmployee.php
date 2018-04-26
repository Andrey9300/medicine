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
            'fio' => "required|max:255",
            'date_birthday' => 'date_format:"d-m-Y"|required',
            'date_employment' => 'date_format:"d-m-Y"|required',
            'medical_book' => "max:255",
        ];
    }
}

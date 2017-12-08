<?php

namespace App\Http\Requests;

use App\Http\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;

class StoreEmployee extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('isAdmin', Employee::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $request = $this->validationData();
        return [
            'fio' => "required|max:255|uniqueNameDateBAndDateE:" .
                $request['fio'] .
                "," . $request['date_birthday'] .
                ',' . $request['date_employment'] .
                ',' . $this->user()->id,
            'date_birthday' => 'date_format:"Y-m-d"|required',
            'date_employment' => 'date_format:"Y-m-d"|required',
            'medical_book' => "max:255",
        ];
    }
}

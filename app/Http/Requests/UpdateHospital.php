<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Models\Hospital;

class UpdateHospital extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $hospital = Hospital::find($this->route('id'));
        return $hospital && $this->user()->can('isAdminAndOwner', $hospital);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => "required",
            'address' => "required|max:255",
            'shedule' => "max:255",
            'phone' => "max:255",
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Http\Models\Organization;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrganization extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('store', Organization::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => "required|unique:organizations",
            'address' => "max:255",
            'legal_entity_id' => "required|max:255",
            'head_email' => "required|email|max:255",
            'phone' => "max:255",
        ];
    }
}

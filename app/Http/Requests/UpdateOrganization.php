<?php

namespace App\Http\Requests;

use App\Http\Models\Lmk\Organization;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOrganization extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $organization = $this->user()->organizations->find($this->route('id'));
        return $organization && $this->user()->can('isAdminAndOwner', $organization);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'category_id' => "required"
        ];
    }
}

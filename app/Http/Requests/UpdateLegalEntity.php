<?php

namespace App\Http\Requests;

use App\Http\Models\LegalEntity;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLegalEntity extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $legalEntity = $this->user()->legalEntities->find($this->route('id'));
        return $legalEntity && $this->user()->can('isAdminAndOwner', $legalEntity);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => "required|max:255",
            'address' => "max:255",
            'phone' => "max:255",
            'inn' => "required",
        ];
    }
}

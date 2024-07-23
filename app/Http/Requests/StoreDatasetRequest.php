<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDatasetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'datasetTitle' => 'required|string|max:255',
            'user_id' => 'required|integer|exists:users,id',
            'research_id' => 'required|integer|exists:researches,id',
            'state' => 'required|string|max:255',
        ];
    }
}

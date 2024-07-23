<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSpeciesRequest extends FormRequest
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
            'color' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'size' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'distribution' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'remarks' => ['nullable', 'regex:/^[A-Za-z\s]+$/'],
            'condition' => ['required', 'in:unknown,endangered,commercial,threatened'],
            'fish_info_id' => ['required', 'integer', 'exists:fish_info,id'],
        ];
    }
}

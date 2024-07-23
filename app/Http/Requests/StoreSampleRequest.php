<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSampleRequest extends FormRequest
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
            'refno' => 'required|string|max:20',
            'samplingid' => 'required|string|max:20',
            'identifiedBy' => 'nullable|string|max:255',
            'identifiedDate' => 'nullable|date',
            'datecollected' => 'required',
            'commonname' => 'nullable|string|max:255',
            'collectorname' => 'required|string|max:255',
            'collectmethod' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'depth' => 'nullable|numeric',
            'weight' => 'nullable|numeric',
            'standardL' => 'nullable|numeric',
            'forkL' => 'nullable|numeric',
            'totalL' => 'nullable|numeric',
            'photo' => 'nullable',
            'type' => 'required|string|max:255',
            'species_id' => 'required',
            'site_id' => 'required|exists:site,id',
        ];
    }
}

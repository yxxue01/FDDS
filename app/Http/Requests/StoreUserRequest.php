<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;


class StoreUserRequest extends FormRequest
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
            'email' => ['required','email','unique:user,email'],
            'password' => ['required','string',Password::min(8)->letters()->symbols()->numbers()],
            'name'=> ['required','string'],
            'researchid' => ['nullable','string'],
            'organization'=> ['nullable','string'],
            'field'=> ['nullable','string'],
            'expertise'=> ['nullable','string'],
            'phoneno'=> ['nullable','string'],
            'role'=> ['required','nullable','string'],
        ];
    }
}

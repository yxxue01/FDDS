<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SharedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'dataset_id' => $this->id,
            'datasetTitle' => $this->datasetTitle,
            'state' => $this->state,
            'username' => $this->name,
            'email' => $this->email
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DatasetShareResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'user_id' => $this->user_id,
            'dataset_id' => $this->dataset_id,
            'datasetTitle' => $this->datasetTitle,
            'state' => $this->state,
            'status' => $this->status,
        ];
        if (isset($this->email)) {
            $data['requester'] = $this->email;
        }
        return $data;
    }
}

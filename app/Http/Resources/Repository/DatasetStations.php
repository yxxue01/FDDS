<?php

namespace App\Http\Resources\Repository;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DatasetStations extends JsonResource
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
            'researcher' => $this->name,
            'sites' => DatasetSite::collection($this->whenLoaded('Site')),
        ];
    }
}

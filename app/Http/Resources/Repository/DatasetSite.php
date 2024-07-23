<?php

namespace App\Http\Resources\Repository;

use App\Http\Resources\SampleResource;
use App\Http\Resources\SpeciesResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DatasetSite extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'siteName' => $this->siteName,
            'status' => $this->status,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'species' => $this->sample->map(function($item){
                return $item->species;
            }),
            'sample' => $this->sample->count()
        ];
    }
}

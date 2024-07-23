<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpeciesResource extends JsonResource
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
            'speciesName' => $this->speciesName,
            'color' => $this->color,
            'distribution' => $this->distribution,
            'size' => $this->size,
            'remarks' => $this->remarks,
            'condition' => $this->condition,
            'fishinfo' => FishInfoResource::make($this->whenLoaded('FishInfo')),
            'fishinfo_id' => $this->fish_info_id
        ];
    }
}

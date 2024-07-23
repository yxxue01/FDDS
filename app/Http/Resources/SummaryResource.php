<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
            return [
                'siteName' => $this['siteName'],
                'data' => $this['data']->map(function ($item){
                    return [
                    'type' => $item->type,
                    'speciesName' => $item->speciesName,
                    'condition' => $item->condition,
                    ];
                }),
            ];
    }
}

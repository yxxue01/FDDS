<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnalysisResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'state' => $this['state'],
            'sites'=>$this['sites']->map(function ($item) {
                return [
                    'siteName' => $item['siteName'],
                    'species'=> $item['species']->map(function ($item) {
                        return[
                            'speciesName'=>$item['speciesName'],
                            'count'=>$item['count'],
                        ];
                    })
                    ];
                })
        ];
    }

    
}

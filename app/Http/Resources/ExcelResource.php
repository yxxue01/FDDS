<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExcelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $photo = "n/a";
        if ($request->photo != null)
            $photo = "available";
        return ([
            "refno" => $this->refno,
            "samplingid" => $this->samplingid,
            "identifiedBy" => $this->identifiedBy,
            "identifiedDate" => $this->identifiedDate,
            "collectorname" => $this->collectorname,
            "datecollected" => $this->datecollected,
            "time" => $this->time,
            "commonname" => $this->commonname,
            "collectmethod" => $this->collectmethod,
            "latitude" => $this->latitude,
            "longitude" => $this->longitude,
            "depth" => $this->depth,
            "weight" => $this->weight,
            "standardL" => $this->standardL,
            "forkL" => $this->forkL,
            "totalL" => $this->totalL,
            "speciesName" => $this->speciesName,
            "photo" => $photo,
        ]);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use DateTime;
use Illuminate\Support\Facades\Storage;

class SampleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $datetime = new DateTime($this->datecollected.'T'.$this->time);
        $identifydate = new DateTime($this->identifiedDate);
        $photo = null;
        if($this->photo!=null)
            $photo = Storage::disk('public')->url($this->photo);
        return [
            'id' => $this->id,
            'refno' => $this->refno,
            'samplingid' => $this->samplingid,
            'identifiedBy' => $this->identifiedBy,
            'identifiedDate' => $identifydate->format('Y-m-d'),
            'datecollected' => $datetime->format('Y-m-d H:i:s'),
            'commonname' => $this->commonname,
            'collectorname' => $this->collectorname,
            'collectmethod' => $this->collectmethod,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'depth' => $this->depth,
            'weight' => $this->weight,
            'standardL' => $this->standardL,
            'forkL' => $this->forkL,
            'totalL' => $this->totalL,
            'photo' => $photo,
            'status' => $this->status,
            'type'=>$this->type,
            'hidden' => $this->hidden,
            'info' => SpeciesResource::make($this->whenLoaded('Species')),
            'sites_id' => $this->site_id,
            'task' => $this->whenLoaded('Task')
        ];
    }
}

<?php

namespace App\Http\Resources\Repository;

use App\Http\Resources\SiteResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DatasetRepo extends JsonResource
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
            //use DatasetAccess instead of dataset_access, because this is the matter of relation, not the same like stated on database "dataset_access"
            'state' => $this->state,
            'site_count' => $this->whenLoaded('Site',function (){
                return $this->Site->where('status', 'completed')->count();
            }),
            
        ];
    }
}

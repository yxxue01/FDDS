<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class AnalysisResult implements WithMultipleSheets
{
    protected $species;
    protected $station;
    protected $index;

    public function __construct($species, $station, $index){
        $this->species = $species;
        $this->station = $station;
        $this->index = $index;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function sheets():array
    {
        return[
            'Species'=> new SpeciesListExport($this->species),
            'Stations'=> new StationExport($this->station),
            'Index'=> new IndexExport($this->index),
        ];
    }
}

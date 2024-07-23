<?php

namespace App\Exports;

use App\Models\FishInfo;
use App\Models\Sample;
use App\Models\Species;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ExportSample implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return \Illuminate\Support\Collection
     */
    protected $siteid;
    public function __construct($siteid)
    {
        $this->siteid = $siteid;
    }
    public function collection()
    {
        $sample =  Sample::where('site_id', $this->siteid)->get();
        foreach ($sample as $item) {
            if ($item->photo != null)
                $item->photo = "available";
            else
                $item->photo = "n/a";
        }

        return $sample;
    }
    public function headings(): array
    {
        return [
            "No",
            "Reference No",
            "Sampling Id",
            "Collector Name",
            "Identification By",
            "Identification Date",
            "Date Collected",
            "Time",
            "Latitude",
            "Longitude",
            "Depth",
            "Collect Method",
            "Family",
            "Species Name",
            "Common Name",
            "Weight",
            "Total Length(cm)",
            "Fork Length(cm)",
            "Standard Length(cm)",
            "Photo",
        ];
    }
    public function map($row): array
    {
        static $counter = 1;
        $species = Species::find($row->species_id);
        $family = FishInfo::find($species->fish_info_id);
        $fields = [
            $counter++,
            $row->refno,
            $row->samplingid,
            $row->collectorname,
            $row->identifiedBy,
            $row->identifiedDate,
            $row->datecollected,
            $row->time,
            $row->latitude,
            $row->longitude,
            $row->depth,
            $row->collectmethod,
            $family->familyName,
            $species->speciesName,
            $row->commonname,
            $row->weight,
            $row->totalL,
            $row->forkL,
            $row->standardL,
            $row->photo,
        ];
        return $fields;
    }
}

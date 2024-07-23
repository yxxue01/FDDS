<?php

namespace App\Imports;

use App\Models\Sample;
use App\Models\Species;
use Maatwebsite\Excel\Concerns\ToModel;
use Atomescrochus\StringSimilarities\Compare;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;




class ImportSample implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    protected $siteid;
    public function __construct($siteid)
    {
        $this->siteid = $siteid;
    }

    public function model(array $row)
    {
        $comparison = new Compare();
        $speciesNames = Species::pluck('speciesName', 'id')->toArray();
        $value = 0;
        $holds = '';
        foreach ($speciesNames as $id => $speciesName) {
            $current = $comparison->similarText($row['species_name'], $speciesName);
            if ($value < $current) {
                $value = $current;
                $holds = $id;
            }
        }
        if (!is_string($row['date_collected'])) {
            $exceldate = Date::excelToDateTimeObject($row['date_collected']);
            $exceldate = $exceldate->format('Y-m-d');
        } else
            $exceldate = $row['date_collected'];

        if (!is_string($row['identification_date'])) {
            $identifiedDate = Date::excelToDateTimeObject($row['identification_date']);
            $identifiedDate = $identifiedDate->format('Y-m-d');
        } else
            $identifiedDate = $row['identification_date'];

        if (!is_string($row['time'])) {
            $exceltime = Date::excelToDateTimeObject($row['time']);
            $exceltime = $exceltime->format('H:i:s');
        } else
            $exceltime = $row['time'];

        Sample::create([
            'refno' => $row['reference_no'],
            'samplingid' => $row['sampling_id'],
            'identifiedBy' => $row['identification_by'],
            'identifiedDate' => $identifiedDate,
            'datecollected' => $exceldate,
            'commonname' => $row['common_name'],
            'collectorname' => $row['collector_name'],
            'collectmethod' => $row['collection_method'],
            'time' => $exceltime,
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
            'depth' => $row['depth'],
            'weight' => $row['weight'],
            'standardL' => $row['standard_length'],
            'totalL' => $row['total_length'],
            'forkL' => $row['fork_length'],
            'site_id' => $this->siteid,
            'species_id' => $holds,
        ]);
    }
}

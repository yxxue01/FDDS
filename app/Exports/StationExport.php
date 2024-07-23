<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class StationExport implements FromCollection, WithHeadings, WithMapping, WithTitle
{
    protected $resource;


    public function __construct($resource)
    {
        $this->resource = collect($resource);
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->resource;

    }

    public function headings(): array
    {
        return [
            'No',
            'Station Name',
        ];
    }

    public function map($row): array
    {
        static $index = 1;
        return [
            $index++,
            $row['station']
        ];
    }

    public function title(): string{
        return 'Station';
    }
}

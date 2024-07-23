<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class IndexExport implements FromCollection, WithHeadings, WithMapping, WithTitle
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
            'Index',
            'Result',
        ];
    }

    public function map($row): array
    {
        return [
            $row['index'],
            $row['count']
        ];
    }

    public function title(): string{
        return 'Indexes';
    }
}

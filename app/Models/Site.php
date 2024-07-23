<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;
    protected $table = 'site';

    protected $fillable = [
        'siteName',
        'latitude',
        'longitude',
        'dataset_id',
    ];

    public $timestamps = false;

    public function Sample (){
        return $this->hasMany(Sample::class);
    }

    public function Dataset(){
        return $this->belongsTo(Dataset::class);
    }
}

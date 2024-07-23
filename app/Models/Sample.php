<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sample extends Model
{
    use HasFactory;
    protected $table = 'sample';
    protected $fillable = [
        'refno',
        'samplingid',
        'identifiedBy',
        'identifiedDate',
        'datecollected',
        'collectorname',
        'commonname',
        'collectmethod',
        'time',
        'latitude',
        'longitude',
        'depth',
        'weight',
        'standardL',
        'totalL',
        'forkL',
        'photo',
        'hidden',
        'status',
        'species_id',
        'type',
        'site_id'];
    public $timestamps = false;

    public function Species(){
        return $this->belongsTo(Species::class,'species_id');
    }
    public function Site(){
        return $this->belongsTo(Site::class);
    }

    public function Task(){
        return $this->hasMany(EdtorTask::class);
    }
}

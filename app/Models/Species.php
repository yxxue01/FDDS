<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Species extends Model
{
    use HasFactory;
    protected $table = 'species';

    protected $fillable = ['speciesName','fish_info_id','condition','color','size','distribution','remarks'];
    public $timestamps = false;

    public function FishInfo(){
        return $this->belongsTo(FishInfo::class);
    }
    public function FishDataset(){
        return $this->hasMany(Sample::class,'species_id');
    }
}
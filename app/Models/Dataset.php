<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dataset extends Model
{
    use HasFactory;

    protected $fillable = ['datasetTitle','user_id','research_id','state'];
    public $timestamps = false;
    protected $table = 'dataset';

    public function Site(){
        return $this->hasMany(Site::class);
    }
    public function DatasetAccess(){
        return $this->hasMany(DatasetAccess::class);
    }
}

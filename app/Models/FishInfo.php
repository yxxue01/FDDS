<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishInfo extends Model
{
    use HasFactory;

    protected $table = 'fish_info';

    protected $fillable = ['familyName','background'];

    public $timestamps = false;

    public function Species(){
        return $this->hasMany(Species::class,'fishinfo_id');
    }
}

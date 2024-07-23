<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Editor extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','fish_info_id'];
    protected $table = 'editor';

    public function FishInfo(){
        return $this->belongsTo(FishInfo::class);
    }
    public function User(){
        return $this->belongsTo(User::class);
    }

}

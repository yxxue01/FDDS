<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EdtorTask extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','sample_id'];
    public $timestamps = false;
    protected $table = 'editor_task';

    public function Sample(){
        return $this->belongsTo(Sample::class);
    }
    public function User(){
        return $this->belongsTo(User::class);
    }

}

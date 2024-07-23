<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatasetAccess extends Model
{
    use HasFactory;

    protected $table = 'dataset_access';
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'dataset_id',
        'privilege_id',
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Dataset(){
        return $this->belongsTo(Dataset::class);
    }

    public function Privilege(){
        return $this->belongsTo(Privilege::class);
    }

}

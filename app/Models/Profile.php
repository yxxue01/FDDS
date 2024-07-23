<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $table = 'profile';
    public $timestamps = false;


    protected $fillable = [
        'name',
        'orcid',
        'organization',
        'field',
        'phoneno',
    ];

    public function User(){
        return $this->hasOne(User::class);
    }
}

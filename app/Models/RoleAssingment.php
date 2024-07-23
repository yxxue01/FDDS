<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleAssingment extends Model
{
    use HasFactory;
    protected $table = 'roleassignment';
    
    protected $fillable = [
        'user_id',
        'role_id'
    ];

    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Role(){
        return $this->belongsTo(Role::class);
    }
}

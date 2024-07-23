<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $table = 'role';
    public $timestamps = false;
    
    protected $fillable = [
        'role'
    ];

    public function Roleassignment(){
        return $this->hasMany(RoleAssingment::class);
    }

    public function Register($request, $user_id){
        $request['user_id']=$user_id;
        $this->create($request);
    }
}

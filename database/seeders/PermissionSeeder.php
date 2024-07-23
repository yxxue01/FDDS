<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name'=> 'create dataset']);
        Permission::create(['name'=> 'read dataset']);
        Permission::create(['name'=> 'update dataset']);
        Permission::create(['name'=> 'delete dataset']);
    }
}

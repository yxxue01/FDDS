<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name'=> 'Super_Admin']);
        $researcher = Role::create(['name'=> 'Researcher']);
        Role::create(['name'=> 'Contributor']);
        Role::create(['name'=> 'Editor']);

        $researcher->syncPermissions(['create dataset','read dataset','update dataset','delete dataset']);
    }
}

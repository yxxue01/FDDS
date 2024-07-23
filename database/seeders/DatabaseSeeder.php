<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Dataset;
use App\Models\DatasetAccess;
use App\Models\FishInfo;
use App\Models\Privilege;
use App\Models\Profile;
use App\Models\Sample;
use App\Models\Site;
use App\Models\Species;
use App\Models\User;
use Database\Factories\DatasetFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(DataSeeder::class);
    }
}

<?php

namespace Database\Factories;

use App\Models\Dataset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Site>
 */
class SiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = collect([
            // 'finished',
            // 'inprocess',
            'completed',
        ]);
        $location = collect([
            'Pulau Redang',
            'Pulau Penyu',
            'Rendah Keramat',
            'Mangroove',
        ]);
        return [
            'siteName'=>$location->random(),
            'latitude'=>$this->faker->numberBetween(1100, 2000)/100.0,
            'longitude'=>$this->faker->numberBetween(1100, 2000)/100.0,
            'status'=>$status->random(),
            'dataset_id'=>Dataset::inRandomOrder()->first()->id,
        ];
    }
}

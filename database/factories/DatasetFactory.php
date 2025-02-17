<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dataset>
 */
class DatasetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $state = collect([
            'Johor',
            'Melaka',
            'Terengganu',
            'sarawak',
        ]);
        return [
            'datasetTitle' => '',
            'state' => $state->random(),
        ];
    }
}

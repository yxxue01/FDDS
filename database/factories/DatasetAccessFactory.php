<?php

namespace Database\Factories;

use App\Models\Dataset;
use App\Models\Privilege;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DatasetAccess>
 */
class DatasetAccessFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'user_id'=>User::inRandomOrder()->first()->id,
            'dataset_id'=>Dataset::inRandomOrder()->first()->id,
            'privilege_id'=>Privilege::inRandomOrder()->first()->id,
        ];
    }
}

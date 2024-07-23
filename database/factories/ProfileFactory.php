<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $expertise = collect(['Fisheries','Aquamarine','Biotechnology']);
        return [
            'name' =>$this->faker->name,
            'researchid' =>$this->faker->randomDigit,
            'organization' =>$this->faker->randomDigit,
            'field' =>$expertise->random(),
            'expertise' =>$expertise->random(),
            'phoneno' =>$this->faker->phoneNumber,
            'user_id'=> User::inRandomOrder()->first()->id,

        ];
    }
}

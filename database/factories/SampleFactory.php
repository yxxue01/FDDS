<?php

namespace Database\Factories;

use App\Models\Dataset;
use App\Models\Site;
use App\Models\Species;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sample>
 */
class SampleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = collect(['rejected','accepted','inprocess']);
        $method = collect(['fish rake','nets','fish hooks','traps']);
        $common = collect([
            'Ikan Kembung (Mackerel)',
            'Ikan Selar (Yellowstripe Scad)',
            'Ikan Pari (Stingray)',
            'Ikan Tenggiri (Spanish Mackerel)',
            'Ikan Kerapu (Grouper)',
            'Ikan Merah (Red Snapper)',
            'Ikan Terubuk (Hilsa Shad)',
            'Ikan Pucuk Ubi (Pomfret)',
            'Ikan Patin (Pangasius)',
            'Ikan Belanak (Silver Grunter)',
            'Ikan Tamban (Indian Mackerel)',
            'Ikan Selayang (Yellowtail Scad)',
        ]);
        return [
            'refno'=>$this->faker->phoneNumber,
            'samplingid'=>$this->faker->phoneNumber,
            'identifiedBy'=>$this->faker->name,
            'identifiedDate'=>$this->faker->date,
            'datecollected'=>$this->faker->date,
            'collectorname'=>$this->faker->name,
            'commonname'=>$common->random(),
            'collectmethod'=>$method->random(),
            'site_id'=> Site::inRandomOrder()->first()->id,
            'time'=> '11:30:52',
            'latitude'=>$this->faker->numberBetween(1100, 2000)/100.0,
            'longitude'=>$this->faker->numberBetween(1500, 2000)/100.0,
            'depth'=>$this->faker->numberBetween(1100, 2000)/100.0,
            'weight'=>$this->faker->numberBetween(1300, 2000)/100.0,
            'standardL'=>$this->faker->numberBetween(1100, 2000)/100.0,
            'totalL'=>$this->faker->numberBetween(1200, 2000)/100.0,
            'forkL'=>$this->faker->numberBetween(1600, 2000)/100.0,
            'species_id'=>Species::inRandomOrder()->first()->id,
            'status'=>$status->random(),
            'type'=>'freshwater',
        ];
    }
}

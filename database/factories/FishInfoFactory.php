<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FishInfo>
 */
class FishInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $desc1 = 'Salmonidae includes salmon and trout known for their anadromous life cycle and prized for their delicious flesh.';
        $desc2 = 'Scombridae consists of fast-swimming pelagic fish like tuna and mackerel, prized in commercial fisheries.';
        $desc3 = 'Clupeidae, the herring family, includes small, oily fish like herring and anchovies, vital in marine ecosystems.';
        $desc4 = 'Carcharhinidae, or requiem sharks, encompasses large, migratory sharks with sharp teeth, known for adaptability.';
        $desc5 = 'Pomacentridae, or damselfish family, features small, colorful reef fish like clownfish, common in coral reef ecosystems.';

        $array = [
            ['fam'=>'Salmonidae','desc'=>$desc1],
            ['fam'=>'Scombridae','desc'=>$desc2],
            ['fam'=>'Clupeidae','desc'=>$desc3],
            ['fam'=>'Carcharhinidae','desc'=>$desc4],
            ['fam'=>'Pomacentridae','desc'=>$desc5],
        ];

        $target = collect($array)->random();
        return [
            'familyName' => $target['fam'],
            'background'=> $target['desc']
        ];
    }
}

<?php

namespace Database\Seeders;

use App\Models\Dataset;
use App\Models\DatasetAccess;
use App\Models\Editor;
use App\Models\FishInfo;
use App\Models\Privilege;
use App\Models\Profile;
use App\Models\Sample;
use App\Models\Site;
use App\Models\Species;
use App\Models\User;
use Database\Factories\DatasetFactory;
use Illuminate\Database\Seeder;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        Profile::create([
            'name' => 'Muhammad Haizam bin Nor',
            'orcid' => 110291,
            'organization' => 'UMT',
            'field' => 'Fisheries',
            'phoneno' => '013-5578989',
        ]);
        $user = User::create([
            'email' => 'user@gmail.com',
            'password' => 'password@123',
            'profile_id' => 1,
        ]);
        $user->assignRole("Researcher");
        Profile::create([
            'name' => 'Siti Fatin Farhana',
            'orcid' => 110292,
            'organization' => 'UMT',
            'field' => 'Fisheries',
            'phoneno' => '013-5578989',
        ]);
        $user2 = User::create([
            'email' => 'user2@gmail.com',
            'password' => 'password@123',
            'profile_id' => 2,
        ]);
        Profile::create([
            'name' => 'editor1',
            'orcid' => 110292,
            'organization' => 'Unisza',
            'field' => 'Fisheries',
            'phoneno' => '013-5578989',
        ]);
        Profile::create([
            'name' => 'editor2',
            'orcid' => 110293,
            'organization' => 'Unisza',
            'field' => 'Fisheries',
            'phoneno' => '013-5578989',
        ]);

        $editor1 = User::create([
            'email' => 'editor1@gmail.com',
            'password' => 'password@123',
            'profile_id' => 3,

        ]);
        $editor2 = User::create([
            'email' => 'editor2@gmail.com',
            'password' => 'password@123',
            'profile_id' => 4,

        ]);
        $adminPro = Profile::create([
            'name' => 'Super Admin',
            'orcid' => 110291,
            'organization' => 'UMT',
            'field' => 'Fisheries',
            'phoneno' => '013-5578989',
        ]);
        $admin = User::create([
            'email' => 'admin@gmail.com',
            'password' => 'password@123',
            'profile_id' => $adminPro->id,
        ]);
        $admin->assignRole("Super_Admin");

        
        $user->assignRole("Researcher");
        $user2->assignRole("Researcher");

        $editor2->assignRole("Editor");
        $editor2->assignRole("Researcher");

        $editor1->assignRole("Editor");
        $editor1->assignRole("Researcher");

        $array = [
            ['fam' => 'Cichlidae', 
            'desc' => null],
            ['fam' => 'Ambassidae', 
            'desc' => 'found in freshwaters, brackish estuaries, mangroves, and shallow coastal water; usually forming aggregations, and feed on small crustaceans, insects, and fishes. Minor importance in fisheries, often marketed as dried and salted; some freshwater species treated as popular aquarium fish.'],
            ['fam' => 'Mugilidae', 
            'desc' => 'fast swimming fishes; inhabits coastal waters (usually to depths of 20 m) including estuaries; often enter freshwater areas and lagoons. Frequently schooling. Feed on detritus or small organisms. Many species are important to fisheries, caught by various nets (e.g., seines, cast nets, and gill nets) and usually marketed fresh, frozen, salted or boiled; roe may be also marketed; often used as live bait in tuna fishing. Generic assignment follows Senou (2002) and Ghasemzadeh et al. (2004).'],
            ['fam' => 'Butidae', 
            'desc' => null],
            ['fam' => 'Tetrodontidae', 
            'desc' => 'occuring in tropical and temperate seas, most frequently in shallow inshore waters, sometimes entering brackish and fresh waters, but a few species are pelagic. The viscera, skin, and blood of most species are poisonous; in some species even the flesh is poisonous. Laymen are strongly recommended not to eat puffers, although connoisseurs like to consume puffers in licensed restaurants in some countries (e.g., Japan).'],
            ['fam' => 'Apogonidae', 
            'desc' => 'chiefly inhabit marine coastal waters, but also found in fresh and brackish water areas in some groups.'],
            ['fam' => 'Gobiidae', 
            'desc' => 'found in various habitats from torrential freshwater rivers to shelf waters (to depth of ca. 500 m), but most common in brackish waters and shallow coastal waters. Large species may be esteemed as food fish; several freshwater species may be treated as aquarium fish.'],
            ['fam' => 'Toxotidae', 
            'desc' => 'inhabit mangrove shores, estuaries, and fresh waters, always in shallow depths. Exhibit impressive hunting techniques in which they use jets of water to knock aerial insects into the water where they can be eaten.'],
            ['fam' => 'Megalopidae', 
            'desc' => 'one genus (Megalops), with two species are known from worldwide, one of which (M. cyprinoides) distributed in the Indo-Pacific. Coastal fishes found in lagoons, bays, and estuaries; commonly travelling in schools in open water; feeds on various fishes and crustaceans. Leptocephalus larva having forked caudal fin. Food fishes used as fresh, dried or salted one; also known as sport fishes.'],
            ['fam' => 'Ariidae', 
            'desc' => 'occurring in tropical to temperate marine, estuarine, and freshwater areas of the world, usually found in coastal and estuarine habitats, abundant in mangrove areas and large river estuaries. Omnivorous, usually feed on crustaceans, mollusks, and fishes. Males incubating the fertilized eggs in its mouth cavity. Food fish.'],
        ];
        foreach ($array as $family) {
            FishInfo::factory()->create([
                'familyName' => $family['fam'],
                'background' => $family['desc']
            ]);
        }
        //
        //
        $fishSpecies = collect([
            ['name' => 'Etroplus suratensis', 
            'family' => 'Cichlidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
            ],
            ['name' => 'Ambassis nalua', 'family' => 'Ambassidae',
            'color' => 'body semitransparent, head and belly silvery; dorsal fins hyaline, exclusive of 2nd spine and membrane between 2nd and 3rd spines of first dorsal fin blackish.',
            'size' => '9.5 cm SL.',
            'distribution' => 'Indo-West Pacific.',
            'remarks' => 'found in bays, brackish estuaries and tidal creeks, especially man-groves.',
            ],
            ['name' => 'Planiliza subviridis', 'family' => 'Mugilidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
            ],
            ['name' => 'Ambassis buruensis', 'family' => 'Ambassidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
        ],
            ['name' => 'Ophiocara porocephala', 'family' => 'Butidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
        ],
            ['name' => 'Ambassis vachellii', 'family' => 'Ambassidae',
            'color' => 'body semitransparent, head and belly silvery; dorsal fins hyaline, exclusive of membrane between 2nd and 3rd spines of first dorsal fin blackish; caudal fin often tinged with yellow.',
            'size' => '5.5 cm SL.',
            'distribution' => 'Indo-West Pacific.',
            'remarks' => 'found in bays, brackish estuaries and tidal creeks, especially mangroves.',
        ],
            ['name' => 'Oxyeleotris marmorata', 'family' => 'Butidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
        ],
            ['name' => 'Dichotomyctere nigroviridis', 'family' => 'Tetrodontidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
        ],
            ['name' => 'Yarica hyalosoma', 'family' => 'Apogonidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
        ],
            ['name' => 'Ambassis macracanthus', 'family' => 'Ambassidae',
            'color' => null,
            'size' => null,
            'distribution' => null,
            'remarks' => null,
        ],
            ['name' => 'Glossogobius aureus', 'family' => 'Gobiidae',
            'color' => 'head and body light yellowish brown, darkened dorsally; body with midlateral series of five dusky blotches, as well as many faint irregular dusky lines and spots dorsally.',
            'size' => '20 cm SL.',
            'distribution' => 'Indo-West Pacific.',
            'remarks' => 'found in lower reaches of large rivers, mangroves, brackish estuaries and adjacent shallow coastal waters with sandy-mud bottoms.',
        ],
            ['name' => 'Toxotes jaculatrix', 'family' => 'Toxotidae',
            'color' => 'body silvery white, brownish green dorsally, with 4 or 5 black blotches or bars along the sides of body; caudal fin pale yellowish; anal fin pale basally, outer half of the fin blackish.',
            'size' => 'maximum total length about 30 cm, commonly to about 20 cm.',
            'distribution' => 'eastern Indian Ocean and western Pacific.',
            'remarks' => 'inhabits mangrove shores and brackish estuaries, always in shallow depths. Feeds on terrestrial insects. Marketed mostly fresh.',
        ],
            ['name' => 'Megalops cyprinoides', 'family' => 'Megalopidae',
            'color' => 'body silvery, darker dorsally; dorsal and caudal fins dark yellowish.',
            'size' => '80 cm SL.',
            'distribution' => 'Indo-Pacific, including the Red Sea, from the east coast of Africa to the Society Islands, north to southern Japan.',
            'remarks' => 'marketed fresh.',
        ],
        ['name' => 'Arius maculutus', 'family' => 'Ariidae',
            'color' => 'body silvery, brownish green dorsally; all fins somewhat brownish; adipose fin pale with a prominent dark marking.',
            'size' => 'maximum length 50 cm.',
            'distribution' => 'Vietnam, Gulf of Thailand, Pacific coasts of Peninsular Thailand and Malaysia, Borneo, Sumatra, and Java.',
            'remarks' => 'inhabits coastal waters and estuaries.',
        ],
        ]);
        foreach ($fishSpecies as $family) {
            $fishid = FishInfo::where('familyName', $family['family'])->first()->id;
            $this->command->info(FishInfo::where('familyName', $family['family'])->first()->familyName);
            Species::factory()->create([
                'speciesName' => $family['name'],
                'color' => $family['color'],
                'distribution' => $family['distribution'],
                'size' => $family['size'],
                'remarks' => $family['remarks'],
                'fish_info_id' => $fishid,
            ]);
        }
        $dataset = Dataset::create([
            'datasetTitle' => 'Location- UMT',
            'state' => 'Terengganu',
        ]);
        $dataset1 = Dataset::create([
            'datasetTitle' => 'Location- Kuala Larut, Matang',
            'state' => 'Perak',
        ]);
        Site::create([
            'siteName' => 'Nearby Perpustakaan Sultanah Nur Zahirah library at the waterway',
            'latitude' => 5.409002,
            'longitude' => 103.088226,
            'status' => 'completed',// inprocess or completed
            'dataset_id' => $dataset->id,
        ]);
        Site::create([
            'siteName' => 'The pedestrian route leading from UMT hostel towards the campus (Jalan Biawak)',
            'latitude' => 5.410437,
            'longitude' => 103.090649,
            'status' => 'completed',// inprocess or completed
            'dataset_id' => $dataset->id,
        ]);
        Site::create([
            'siteName' => 'Salt Water Hatchery, near the guardhouse behind UMT',
            'latitude' => 5.414536,
            'longitude' => 103.084880,
            'status' => 'completed',// inprocess or completed
            'dataset_id' => $dataset->id,
        ]);
        Site::create([
            'siteName' => 'Masjid UMT',
            'latitude' => 5.407801,
            'longitude' => 103.090683,
            'status' => 'completed',// inprocess or completed
            'dataset_id' => $dataset->id,
        ]);
        Site::create([
            'siteName' => 'Station 1',
            'latitude' => 4.789321991,
            'longitude' => 100.627503,
            'status' => 'completed',// inprocess or completed
            'dataset_id' => $dataset1->id,
        ]);
        // Site::create([
        //     'siteName' => 'Tasik UMS',
        //     'latitude' => 5.407801,
        //     'longitude' => 103.090683,
        //     'status' => 'completed',// inprocess or completed
        //     'dataset_id' => $dataset2->id,
        // ]);
        Privilege::factory(1)->create([
            'description' => 'owner'
        ]);
        Privilege::factory(1)->create([
            'description' => 'shared'
        ]);
        Privilege::factory(1)->create([
            'description' => 'requested'
        ]);
        Privilege::factory(1)->create([
            'description' => 'rejected'
        ]);
        $this->call(SampleSeeder::class);
        DatasetAccess::create([
            'user_id' => 1,
            'dataset_id' => 1,
            'privilege_id' => 1,
        ]);
        DatasetAccess::create([
            'user_id' => 2,
            'dataset_id' => 2,
            'privilege_id' => 1,
        ]);
        // DatasetAccess::create([
        //     'user_id' => 1,
        //     'dataset_id' => 2,
        //     'privilege_id' => 1,
        // ]);
        // DatasetAccess::create([
        //     'user_id' => 2,
        //     'dataset_id' => 3,
        //     'privilege_id' => 1,
        // ]);
        Editor::create([
            'user_id'=>$editor2->id,
            'fish_info_id'=>1,
        ]);

        Editor::create([
            'user_id'=>$editor2->id,
            'fish_info_id'=>2,
        ]);
        Editor::create([
            'user_id'=>$editor2->id,
            'fish_info_id'=>3,
        ]);

        Editor::create([
            'user_id'=>$editor2->id,
            'fish_info_id'=>4,
        ]);
        Editor::create([
            'user_id'=>$editor1->id,
            'fish_info_id'=>5,
        ]);

        Editor::create([
            'user_id'=>$editor1->id,
            'fish_info_id'=>6,
        ]);
        Editor::create([
            'user_id'=>$editor1->id,
            'fish_info_id'=>7,
        ]);

        Editor::create([
            'user_id'=>$editor1->id,
            'fish_info_id'=>8,
        ]);
        Editor::create([
            'user_id'=>$editor1->id,
            'fish_info_id'=>9,
        ]);
        Editor::create([
            'user_id'=>$editor1->id,
            'fish_info_id'=>10,
        ]);
    }
}

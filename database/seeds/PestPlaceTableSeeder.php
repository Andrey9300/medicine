<?php

use Illuminate\Database\Seeder;

class PestPlaceTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('pest_places')->insert([
            'id' => 1,
            'name' => 'Точка #1',
            'type' => '1',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 2,
            'name' => 'Точка #2',
            'type' => '1',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 3,
            'name' => 'Точка #3',
            'type' => '1',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 4,
            'name' => 'Точка #4',
            'type' => '2',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 5,
            'name' => 'Точка #5',
            'type' => '2',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 6,
            'name' => 'Точка #6',
            'type' => '2',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 7,
            'name' => 'Точка #7',
            'type' => '3',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 8,
            'name' => 'Точка #8',
            'type' => '3',
            'location_id' => 1
        ]);
        DB::table('pest_places')->insert([
            'id' => 9,
            'name' => 'Точка #9',
            'type' => '3',
            'location_id' => 1
        ]);

        DB::table('pest_places')->insert([
            'id' => 10,
            'name' => 'Точка #1',
            'type' => '1',
            'location_id' => 2
        ]);
        DB::table('pest_places')->insert([
            'id' => 11,
            'name' => 'Точка #2',
            'type' => '1',
            'location_id' => 2
        ]);
        DB::table('pest_places')->insert([
            'id' => 12,
            'name' => 'Точка #3',
            'type' => '1',
            'location_id' => 2
        ]);

        DB::table('pest_places')->insert([
            'id' => 13,
            'name' => 'Точка #1',
            'type' => '3',
            'location_id' => 3
        ]);
        DB::table('pest_places')->insert([
            'id' => 14,
            'name' => 'Точка #2',
            'type' => '3',
            'location_id' => 3
        ]);
        DB::table('pest_places')->insert([
            'id' => 15,
            'name' => 'Точка #3',
            'type' => '3',
            'location_id' => 3
        ]);
    }
}

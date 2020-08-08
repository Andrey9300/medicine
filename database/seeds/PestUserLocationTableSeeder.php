<?php

use Illuminate\Database\Seeder;

class PestUserLocationTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('pest_user_locations')->insert([
            'id' => 1,
            'user_id' => 1,
            'location_id' => 1
        ]);
        DB::table('pest_user_locations')->insert([
            'id' => 2,
            'user_id' => 1,
            'location_id' => 2
        ]);
        DB::table('pest_user_locations')->insert([
            'id' => 3,
            'user_id' => 1,
            'location_id' => 3
        ]);
    }
}

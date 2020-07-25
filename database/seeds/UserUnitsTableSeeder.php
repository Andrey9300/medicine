<?php

use Illuminate\Database\Seeder;

class UserUnitsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_units')->insert([
            'user_id' => 1,
            'unit_id' => 1
        ]);
        DB::table('user_units')->insert([
            'user_id' => 1,
            'unit_id' => 2
        ]);
        DB::table('user_units')->insert([
            'user_id' => 1,
            'unit_id' => 3
        ]);

        // for demo user
        DB::table('user_units')->insert([
            'user_id' => 4,
            'unit_id' => 5
        ]);
        DB::table('user_units')->insert([
            'user_id' => 4,
            'unit_id' => 6
        ]);
        DB::table('user_units')->insert([
            'user_id' => 4,
            'unit_id' => 7
        ]);
    }
}

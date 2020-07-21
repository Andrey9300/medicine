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
    }
}

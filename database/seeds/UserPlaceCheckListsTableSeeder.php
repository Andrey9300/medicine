<?php

use Illuminate\Database\Seeder;

class UserPlaceCheckListsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_place_check_lists')->insert([
            'user_id' => 1,
            'lists_id' => 1
        ]);
        DB::table('user_place_check_lists')->insert([
            'user_id' => 1,
            'lists_id' => 2
        ]);
        DB::table('user_place_check_lists')->insert([
            'user_id' => 1,
            'lists_id' => 3
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class UserPlaceCheckListCriterionTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_place_check_list_criterion')->insert([
            'user_id' => 1,
            'list_id' => 1
        ]);
        DB::table('user_place_check_list_criterion')->insert([
            'user_id' => 1,
            'list_id' => 2
        ]);
        DB::table('user_place_check_list_criterion')->insert([
            'user_id' => 1,
            'list_id' => 3
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class UserGroupCriterionListTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_group_criterion_list')->insert([
            'user_id' => 1,
            'group_criterion_list_id' => 4
        ]);
        DB::table('user_group_criterion_list')->insert([
            'user_id' => 1,
            'group_criterion_list_id' => 5
        ]);
        DB::table('user_group_criterion_list')->insert([
            'user_id' => 1,
            'group_criterion_list_id' => 6
        ]);
    }
}

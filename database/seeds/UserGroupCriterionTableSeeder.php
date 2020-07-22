<?php

use Illuminate\Database\Seeder;

class UserGroupCriterionTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_group_criterion')->insert([
            'user_id' => 1,
            'group_criterion_id' => 1
        ]);
        DB::table('user_group_criterion')->insert([
            'user_id' => 1,
            'group_criterion_id' => 2
        ]);
        DB::table('user_group_criterion')->insert([
            'user_id' => 1,
            'group_criterion_id' => 3
        ]);
        DB::table('user_group_criterion')->insert([
            'user_id' => 1,
            'group_criterion_id' => 4
        ]);
        DB::table('user_group_criterion')->insert([
            'user_id' => 1,
            'group_criterion_id' => 5
        ]);
        DB::table('user_group_criterion')->insert([
            'user_id' => 1,
            'group_criterion_id' => 6
        ]);
        DB::table('user_group_criterion')->insert([
            'user_id' => 1,
            'group_criterion_id' => 7
        ]);
    }
}

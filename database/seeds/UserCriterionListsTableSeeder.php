<?php

use Illuminate\Database\Seeder;

class UserCriterionListsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_criterion_lists')->insert([
            'user_id' => 1,
            'lists_id' => 4
        ]);
        DB::table('user_criterion_lists')->insert([
            'user_id' => 1,
            'lists_id' => 5
        ]);
        DB::table('user_criterion_lists')->insert([
            'user_id' => 1,
            'lists_id' => 6
        ]);
        DB::table('user_criterion_lists')->insert([
            'user_id' => 1,
            'lists_id' => 7
        ]);
        DB::table('user_criterion_lists')->insert([
            'user_id' => 1,
            'lists_id' => 8
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class UserCriterionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_criterions')->insert([
            'user_id' => 1,
            'criterion_id' => 4
        ]);
        DB::table('user_criterions')->insert([
            'user_id' => 1,
            'criterion_id' => 5
        ]);
        DB::table('user_criterions')->insert([
            'user_id' => 1,
            'criterion_id' => 6
        ]);
    }
}

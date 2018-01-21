<?php

use Illuminate\Database\Seeder;

class UsersResearchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_researches')->insert([
            'id' => 1,
            'user_id' => 1,
            'research_categories_id' => 1
        ]);
        DB::table('user_researches')->insert([
            'id' => 2,
            'user_id' => 1,
            'research_categories_id' => 2
        ]);
        DB::table('user_researches')->insert([
            'id' => 3,
            'user_id' => 1,
            'research_categories_id' => 3
        ]);
        DB::table('user_researches')->insert([
            'id' => 4,
            'user_id' => 1,
            'research_categories_id' => 4
        ]);
        DB::table('user_researches')->insert([
            'id' => 5,
            'user_id' => 1,
            'research_categories_id' => 5
        ]);
        DB::table('user_researches')->insert([
            'id' => 6,
            'user_id' => 1,
            'research_categories_id' => 6
        ]);
        DB::table('user_researches')->insert([
            'id' => 7,
            'user_id' => 1,
            'research_categories_id' => 7
        ]);
        DB::table('user_researches')->insert([
            'id' => 8,
            'user_id' => 1,
            'research_categories_id' => 8
        ]);
        DB::table('user_researches')->insert([
            'id' => 9,
            'user_id' => 1,
            'research_categories_id' => 9
        ]);
        DB::table('user_researches')->insert([
            'id' => 10,
            'user_id' => 1,
            'research_categories_id' => 10
        ]);
        DB::table('user_researches')->insert([
            'id' => 11,
            'user_id' => 1,
            'research_categories_id' => 11
        ]);
        DB::table('user_researches')->insert([
            'id' => 12,
            'user_id' => 1,
            'research_categories_id' => 12
        ]);
        DB::table('user_researches')->insert([
            'id' => 13,
            'user_id' => 1,
            'research_categories_id' => 13
        ]);
        DB::table('user_researches')->insert([
            'id' => 14,
            'user_id' => 1,
            'research_categories_id' => 14
        ]);
        DB::table('user_researches')->insert([
            'id' => 15,
            'user_id' => 1,
            'research_categories_id' => 15
        ]);
    }
}

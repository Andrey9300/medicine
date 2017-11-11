<?php

use Illuminate\Database\Seeder;

class ResearchesCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('research_category')->insert([
            'id' => '1',
            'category_id' => '1',
            'research_id' => '1',
        ]);
        DB::table('research_category')->insert([
            'id' => '2',
            'category_id' => '1',
            'research_id' => '2',
        ]);
        DB::table('research_category')->insert([
            'id' => '3',
            'category_id' => '1',
            'research_id' => '3',
        ]);
        DB::table('research_category')->insert([
            'id' => '4',
            'category_id' => '2',
            'research_id' => '1',
        ]);
        DB::table('research_category')->insert([
            'id' => '5',
            'category_id' => '2',
            'research_id' => '2',
        ]);
        DB::table('research_category')->insert([
            'id' => '6',
            'category_id' => '2',
            'research_id' => '3',
        ]);
        DB::table('research_category')->insert([
            'id' => '7',
            'category_id' => '2',
            'research_id' => '4',
        ]);
    }
}

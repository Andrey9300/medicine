<?php

use Illuminate\Database\Seeder;

class UserResearchTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_research')->insert([
            'user_id' => '1',
            'research_id' => '1',
            'date' => '2017-01-01'
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class HospitalResearchTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hospital_research')->insert([
            'hospital_id' => '1',
            'researches_id' => '1',
            'price' => '100'
        ]);
    }
}

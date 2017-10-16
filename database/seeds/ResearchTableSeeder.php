<?php

use Illuminate\Database\Seeder;

class ResearchTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('researches')->insert([
            'name' => 'Больница 1',
            'period' => 'Москва ул Больница'
        ]);
    }
}

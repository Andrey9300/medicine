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
            'name' => 'Исследование 1',
            'period' => 'раз в год'
        ]);
    }
}

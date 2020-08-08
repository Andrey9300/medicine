<?php

use Illuminate\Database\Seeder;

class PestLocationTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('pest_locations')->insert([
            'id' => 1,
            'name' => 'Этаж #1'
        ]);
        DB::table('pest_locations')->insert([
            'id' => 2,
            'name' => 'Этаж #2'
        ]);
        DB::table('pest_locations')->insert([
            'id' => 3,
            'name' => 'Этаж #3'
        ]);
    }
}

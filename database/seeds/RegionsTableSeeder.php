<?php

use Illuminate\Database\Seeder;

class RegionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('regions')->insert([
            'id' => 1,
            'name' => 'Московская область',
        ]);
        DB::table('regions')->insert([
            'id' => 2,
            'name' => 'Вологодская область',
        ]);
        DB::table('regions')->insert([
            'id' => 3,
            'name' => 'Ярославская область',
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class HospitalsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hospitals')->insert([
            'name' => 'Больница 1',
            'address' => 'Москва ул Больница',
            'shedule' => 'c 9 до 18',
            'photo_map' => '',
            'phone' => '3',
        ]);
    }
}

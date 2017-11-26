<?php

use Illuminate\Database\Seeder;

class LegalEntitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('legal_entities')->insert([
            'id' => 1,
            'name' => 'Юр лицо 1',
            'address' => 'Москва, зарядье',
            'phone' => '+7(495)-123-45-67',
            'inn' => '1',
            'user_id' => 1,
        ]);
        DB::table('legal_entities')->insert([
            'id' => 2,
            'name' => 'Юр лицо 2',
            'address' => 'Москва, строгино',
            'phone' => '+7(495)-123-45-68',
            'inn' => '2',
            'user_id' => 1,
        ]);
        DB::table('legal_entities')->insert([
            'id' => 3,
            'name' => 'Юр лицо 3',
            'address' => 'Москва, центр',
            'phone' => '+7(495)-123-45-69',
            'inn' => '3',
            'user_id' => 2,
        ]);
        DB::table('legal_entities')->insert([
            'id' => 4,
            'name' => 'Юр лицо 4',
            'address' => 'Москва, ленинградская',
            'phone' => '+7(495)-123-45-70',
            'inn' => '4',
            'user_id' => 3,
        ]);
    }
}

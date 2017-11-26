<?php

use Illuminate\Database\Seeder;

class OrganizationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('organizations')->insert([
            'id' => 1,
            'name' => 'ООО Мясокомбинат',
            'address' => 'г. Москва, улица Смирнова, д. 7, к1',
            'legal_entity_id' => 1,
            'head_email' => 'kalin@meet.ru',
            'phone' => '+79991234567',
            'region_id' => '1',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'id' => 2,
            'name' => 'ОАО Рыбокомбинат',
            'address' => 'г. Москва, улица Иванова, д. 11, к5',
            'legal_entity_id' => 3,
            'head_email' => 'branin@meet.ru',
            'phone' => '+79991234568',
            'region_id' => '1',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'id' => 3,
            'name' => 'ЗАО Хлебокобинат',
            'address' => 'г. Москва, улица Сидорова, д. 19, к9',
            'legal_entity_id' => 4,
            'head_email' => 'bran@fish.ru',
            'phone' => '+79991234569',
            'region_id' => '1',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'id' => 4,
            'name' => 'ОАО Сырокомбинат',
            'address' => 'г. Москва, улица Сидорова, д. 19, к9',
            'legal_entity_id' => 2,
            'head_email' => 'kalin@meet.ru',
            'phone' => '+79991234569',
            'region_id' => 1,
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'id' => 5,
            'name' => 'АО Колбасный цех',
            'address' => 'г. Москва, улица Сидорова, д. 19, к9',
            'legal_entity_id' => 2,
            'head_email' => 'kalin@meet.ru',
            'phone' => '+79991234569',
            'region_id' => '1',
            'category_id' => '1',
        ]);
    }
}

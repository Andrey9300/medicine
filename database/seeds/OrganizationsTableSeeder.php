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
            'name' => 'ООО Мясокомбинат',
            'address' => 'г. Москва, улица Смирнова, д. 7, к1',
            'legal_entity' => 'МясоКом',
            'head_email' => 'krenko@meet.ru',
            'phone' => '+79991234567',
            'region_id' => '1',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'name' => 'ОАО Рыбокомбинат',
            'address' => 'г. Москва, улица Иванова, д. 11, к5',
            'legal_entity' => 'РыбоКом',
            'head_email' => 'parkin@meet.ru',
            'phone' => '+79991234568',
            'region_id' => '1',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'name' => 'ЗАО Хлебокобинат',
            'address' => 'г. Москва, улица Сидорова, д. 19, к9',
            'legal_entity' => 'ХлебоКом',
            'head_email' => 'brenkin@meet.ru',
            'phone' => '+79991234569',
            'region_id' => '1',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'name' => 'ОАО Сырокомбинат',
            'address' => 'г. Москва, улица Сидорова, д. 19, к9',
            'legal_entity' => 'ХлебоКом',
            'head_email' => 'kalin@meet.ru',
            'phone' => '+79991234569',
            'region_id' => '1',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'name' => 'АО Колбасный цех',
            'address' => 'г. Москва, улица Сидорова, д. 19, к9',
            'legal_entity' => 'ХлебоКом',
            'head_email' => 'kalin@meet.ru',
            'phone' => '+79991234569',
            'region_id' => '1',
            'category_id' => '1',
        ]);
    }
}

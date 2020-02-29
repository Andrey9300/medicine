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
            'head_email' => 'krenko@meet.ru',
            'category_id' => '1',
            'head_position' => 'Главный менеджер',
            'head_phone' => '9-999-999-99-99',
        ]);

        DB::table('organizations')->insert([
            'id' => 2,
            'name' => 'ОАО Рыбокомбинат',
            'head_email' => 'parkin@meet.ru',
            'category_id' => '1',
            'head_position' => 'Самый главный менеджер',
            'head_phone' => '8-888-888-88-88',
        ]);

        DB::table('organizations')->insert([
            'id' => 3,
            'name' => 'ЗАО Хлебокобинат',
            'head_email' => 'brenkin@meet.ru',
            'category_id' => '1',
            'head_position' => 'Еще главнее менеджер',
            'head_phone' => '7-777-777-77-77',
        ]);

        DB::table('organizations')->insert([
            'id' => 4,
            'name' => 'ОАО Сырокомбинат',
            'head_email' => 'krenko@meet.ru',
            'category_id' => '2',
            'head_position' => 'Менеджер',
            'head_phone' => '6-666-666-66-66',
        ]);

        DB::table('organizations')->insert([
            'id' => 5,
            'name' => 'АО Колбасный цех',
            'head_email' => 'krenko@meet.ru',
            'category_id' => '3',
            'head_position' => 'Зам. менеджер',
            'head_phone' => '5-555-555-55-55',
        ]);
    }
}

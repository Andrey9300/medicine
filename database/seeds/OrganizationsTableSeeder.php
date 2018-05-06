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
        ]);

        DB::table('organizations')->insert([
            'id' => 2,
            'name' => 'ОАО Рыбокомбинат',
            'head_email' => 'parkin@meet.ru',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'id' => 3,
            'name' => 'ЗАО Хлебокобинат',
            'head_email' => 'brenkin@meet.ru',
            'category_id' => '1',
        ]);

        DB::table('organizations')->insert([
            'id' => 4,
            'name' => 'ОАО Сырокомбинат',
            'head_email' => 'krenko@meet.ru',
            'category_id' => '2',
        ]);

        DB::table('organizations')->insert([
            'id' => 5,
            'name' => 'АО Колбасный цех',
            'head_email' => 'krenko@meet.ru',
            'category_id' => '3',
        ]);
    }
}

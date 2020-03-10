<?php

use Illuminate\Database\Seeder;

class UserLocationsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Кухня ресторана TH (1 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Кухня ресторана Ибис (1 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Кухня банкетной службы'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Кухня персонала (-1 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Общие производственные помещения (-1 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Зона сортировки мусора'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Ресторан Town House (1 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Ресторан Ibis (1 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Бар Ibis (1 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Банкетная служба (2 этаж)'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Склад алкогольной продукции '
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Склад оборудования и материалов'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Зона приемки'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Склады “пищевые”'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Склады “непищевые”'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Холодильные камеры'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Морозильные камеры'
        ]);
        DB::table('user_locations')->insert([
            'user_id' => 1,
            'name' => 'Бар Лайбрари (1 этаж)'
        ]);
    }
}

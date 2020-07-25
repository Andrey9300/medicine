<?php

use Illuminate\Database\Seeder;

class AuditsLocationsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('audits_locations')->insert([
            'unit_id' => 1,
            'name' => 'Кухня ресторана ТН (1 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 1,
            'name' => 'Кухня ресторана Ибис (1 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 1,
            'name' => 'Кухня банкетной службы'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 1,
            'name' => 'Кухня персонала (-1 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 1,
            'name' => 'Общие производственные помещения (-1 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 1,
            'name' => 'Склады непищевые'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 1,
            'name' => 'Зона сортировки мусора'
        ]);

        DB::table('audits_locations')->insert([
            'unit_id' => 2,
            'name' => 'Ресторан Town House (1 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 2,
            'name' => 'Бар Library'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 2,
            'name' => 'Ресторан Ibis (1 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 2,
            'name' => 'Бар Ibis (1 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 2,
            'name' => 'Банкетная служба (2 этаж)'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 2,
            'name' => 'Склады “пищевые”'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 2,
            'name' => 'Склады “непищевые”'
        ]);

        DB::table('audits_locations')->insert([
            'unit_id' => 3,
            'name' => 'Зона приемки'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 3,
            'name' => 'Склады “пищевые”'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 3,
            'name' => 'Склады “непищевые”'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 3,
            'name' => 'Холодильные камеры'
        ]);
        DB::table('audits_locations')->insert([
            'unit_id' => 3,
            'name' => 'Морозильные камеры'
        ]);

        // for demo user
        DB::table('audits_locations')->insert([
            'id' => 20,
            'unit_id' => 5,
            'name' => 'Кухня ресторана'
        ]);
        DB::table('audits_locations')->insert([
            'id' => 21,
            'unit_id' => 5,
            'name' => 'Общие производственные помещения'
        ]);
        DB::table('audits_locations')->insert([
            'id' => 22,
            'unit_id' => 5,
            'name' => 'Банкетная служба'
        ]);
        DB::table('audits_locations')->insert([
            'id' => 23,
            'unit_id' => 6,
            'name' => 'Склады “пищевые”'
        ]);
        DB::table('audits_locations')->insert([
            'id' => 24,
            'unit_id' => 6,
            'name' => 'Холодильные камеры'
        ]);
        DB::table('audits_locations')->insert([
            'id' => 25,
            'unit_id' => 7,
            'name' => 'Морозильные камеры'
        ]);
    }
}

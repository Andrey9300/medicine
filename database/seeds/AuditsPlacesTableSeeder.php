<?php

use Illuminate\Database\Seeder;

class AuditsPlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Горячий цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Холодный цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Зона сервировки завтраков'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Зона приготовления горячих блюд'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Зона приготовления холодных блюд'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Зона раздачи'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Овощной цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Яичный цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Мясной цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Выпечной цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад химии и инвентаря'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Зона сортировки вторсырья'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Зона временного хранения вторсырья'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Зона выгрузки отходов'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Производственная зона'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Гостевая зона'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад бакалеи'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад напитков'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад для НК'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад оборудования'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад канцелярии'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Молочный гастроном'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Мясной гастроном'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Овощная камера'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Мясная камера'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Мойка кухонной посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Мойка столовой посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад пищевых продуктов'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Инвентарная (хранение уборочного инвентаря)'
        ]);
    }
}

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
            'name' => 'Мойка кух посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Мойка стол посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Склад продуктов'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 1,
            'name' => 'Инвентарная'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 2,
            'name' => 'Горячий цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 2,
            'name' => 'Холодный цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 2,
            'name' => 'Мойка кух посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 2,
            'name' => 'Мойка стол посуды'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 3,
            'name' => 'Горячий цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 3,
            'name' => 'Холодный цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 3,
            'name' => 'Мойка кух посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 3,
            'name' => 'Мойка стол посуды'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 4,
            'name' => 'Зона раздачи'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 4,
            'name' => 'Мойка кух посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 4,
            'name' => 'Мойка стол посуды'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 4,
            'name' => 'Обеденный зал'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 5,
            'name' => 'Коренной цех + овощная камера'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 5,
            'name' => 'Мясной цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 5,
            'name' => 'Яичный цех'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 5,
            'name' => 'Выпечной цех'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 6,
            'name' => 'Склад химии и инвентаря'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 7,
            'name' => 'Сортировка'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 7,
            'name' => 'Временное хранение'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 7,
            'name' => 'Зона выгрузки'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 8,
            'name' => 'Производственная зона'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 8,
            'name' => 'Гостевая зона'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 9,
            'name' => 'Производственная зона'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 9,
            'name' => 'Гостевая зона'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 9,
            'name' => 'Мойка стол посуды'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 10,
            'name' => 'Производственная зона'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 10,
            'name' => 'Гостевая зона'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 11,
            'name' => 'Производственная зона'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 11,
            'name' => 'Гостевая зона'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 12,
            'name' => 'Производственная зона'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 13,
            'name' => 'Напитки алкогольные'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 14,
            'name' => 'Оборудование и материалы'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 15,
            'name' => 'Загрузочная'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 16,
            'name' => 'Бакалея'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 16,
            'name' => 'Напитки'
        ]);


        DB::table('audits_places')->insert([
            'location_id' => 17,
            'name' => 'Для НК'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 17,
            'name' => 'Материалы'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 17,
            'name' => 'Канцелярия'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 18,
            'name' => 'Мясной гастроном'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 18,
            'name' => 'Молочный гастроном'
        ]);

        DB::table('audits_places')->insert([
            'location_id' => 19,
            'name' => 'Мясо-рыбный'
        ]);
        DB::table('audits_places')->insert([
            'location_id' => 19,
            'name' => 'Овощи / мороженое'
        ]);
    }
}

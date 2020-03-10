<?php

use Illuminate\Database\Seeder;

class UserPlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Горячий цех'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Холодный цех'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Зона сервировки завтраков'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Зона приготовления горячих блюд'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Зона приготовления холодных блюд'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Зона раздачи'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Овощной цех'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Яичный цех'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Мясной цех'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Выпечной цех'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Склад химии и инвентаря'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Зона сортировки вторсырья'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Зона временного хранения вторсырья'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Зона выгрузки отходов'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Производственная зона'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Гостевая зона'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Склад бакалеи'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Склад напитков'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Склад для НК'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Склад оборудования'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Склад канцелярии'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Молочный гастроном'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Мясной гастроном'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Овощная камера'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Мясная камера'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Мойка кухонной посуды'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Мойка столовой посуды'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Склад пищевых продуктов'
        ]);
        DB::table('user_places')->insert([
            'user_id' => 1,
            'name' => 'Инвентарная (хранение уборочного инвентаря)'
        ]);
    }
}

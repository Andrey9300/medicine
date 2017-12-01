<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'id' => 1,
            'name' => 'Пищевые предприятия (кроме молочных производств)',
        ]);
        DB::table('categories')->insert([
            'id' => 2,
            'name' => 'Общественное питание',
        ]);
        DB::table('categories')->insert([
            'id' => 3,
            'name' => 'Студенты декретированных производств',
        ]);
        DB::table('categories')->insert([
            'id' => 4,
            'name' => 'Медицинские работники',
        ]);
        DB::table('categories')->insert([
            'id' => 5,
            'name' => 'Педагоги',
        ]);
        DB::table('categories')->insert([
            'id' => '6',
            'name' => 'ДОЛ',
        ]);
        DB::table('categories')->insert([
            'id' => 7,
            'name' => 'Дошкольные учреждения',
        ]);
        DB::table('categories')->insert([
            'id' => 8,
            'name' => 'Комунально-бытовая сфера',
        ]);
        DB::table('categories')->insert([
            'id' => 9,
            'name' => 'Бассейны',
        ]);
        DB::table('categories')->insert([
            'id' => 10,
            'name' => 'Гостиницы, РЖД, Авиаперевозки',
        ]);
        DB::table('categories')->insert([
            'id' => 11,
            'name' => 'Фармакология',
        ]);
        DB::table('categories')->insert([
            'id' => 12,
            'name' => 'Водоканал',
        ]);
        DB::table('categories')->insert([
            'id' => 13,
            'name' => 'Молочная промышленность',
        ]);
    }
}

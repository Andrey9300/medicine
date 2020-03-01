<?php

use Illuminate\Database\Seeder;

class ResearchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('researches')->insert([
            'id' => 1,
            'name' => 'Терапевт',
            'description' => '1 раз в год',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 2,
            'name' => 'Психиатр',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 3,
            'name' => 'Нарколог',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 4,
            'name' => 'Дерматолог + сифилис',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 5,
            'name' => 'Оториноларинголог',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 6,
            'name' => 'Стоматолог',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 7,
            'name' => 'Рентгенография грудной клетки',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 8,
            'name' => 'Исследования на гельминтозы',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 9,
            'name' => 'Исследование кишечных инфекций',
            'period_id' => 2
        ]);
        DB::table('researches')->insert([
            'id' => 10,
            'name' => 'Исследование на брюшной тиф',
            'period_id' => 2
        ]);
        DB::table('researches')->insert([
            'id' => 11,
            'name' => 'Исследование на наличие патогенного стафилококка',
            'period_id' => 2
        ]);
        DB::table('researches')->insert([
            'id' => 13,
            'name' => 'Вакцинация от дизентерии Зонне',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 14,
            'name' => 'Вакцинация Вирусный Гепатит А (Дата №1)',
            'description' => 'Между Дата №1 и дата №2 должно быть не больше 12 месяцев',
            'period_id' => 1
        ]);
        DB::table('researches')->insert([
            'id' => 15,
            'name' => 'Исследование крови / Вакцинация против Кори',
            'description' => 'Для лиц до 55 лет',
            'period_id' => 1
        ]);
        DB::table('researches')->insert([
            'id' => 16,
            'name' => 'Исследование крови / Вакцинация против Дифтерии',
            'period_id' => 6
        ]);
        DB::table('researches')->insert([
            'id' => 17,
            'name' => 'Гигиеническое обучение и аттестация',
            'period_id' => 4
        ]);
        DB::table('researches')->insert([
            'id' => 18,
            'name' => 'Психиатрическое освидетельствование',
            'period_id' => 5
        ]);
        DB::table('researches')->insert([
            'id' => 19,
            'name' => 'Предварительный / периодический медицинский осмотр',
            'period_id' => 4
        ]);
        DB::table('researches')->insert([
            'id' => 20,
            'name' => 'Вакцинация Вирусный Гепатит А (Дата №2)',
            'description' => 'Между Дата №1 и дата №2 должно быть не больше 12 месяцев',
            'period_id' => 1
        ]);
    }
}

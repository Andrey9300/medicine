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
            'name' => 'Дерматолог',
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
            'name' => 'Исследования на гельминтозы',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 8,
            'name' => 'Рентгенография грудной клетки',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 9,
            'name' => 'Исследование крови на сифилис',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 10,
            'name' => 'Исследования на носительство возбудителей кишечных инфекций',
            'period_id' => 2
        ]);
        DB::table('researches')->insert([
            'id' => 11,
            'name' => 'Серологическое обследование на брюшной тиф',
            'period_id' => 2
        ]);
        DB::table('researches')->insert([
            'id' => 12,
            'name' => 'Мазок из зева и носа на наличие патогенного стафилококка',
            'period_id' => 2
        ]);
        DB::table('researches')->insert([
            'id' => 13,
            'name' => 'Вакцинация притив шегеллезов (дизентерия Зонне)',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 14,
            'name' => 'Вакцинация Вирусный Гепатит А',
            'period_id' => 1
        ]);
        DB::table('researches')->insert([
            'id' => 15,
            'name' => 'Вакцинация против Кори',
            'period_id' => 6
        ]);
        DB::table('researches')->insert([
            'id' => 16,
            'name' => 'Вакцинация против Дифтерии',
            'period_id' => 6
        ]);
        DB::table('researches')->insert([
            'id' => 17,
            'name' => 'Гигиеническое обучение и аттестация',
            'period_id' => 4
        ]);
        DB::table('researches')->insert([
            'id' => 18,
            'name' => 'Мазки на гонорею',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 19,
            'name' => 'Флюорография легких',
            'period_id' => 3
        ]);
        DB::table('researches')->insert([
            'id' => 20,
            'name' => 'Вакцинация против Шигеллезов',
            'period_id' => 3
        ]);
    }
}

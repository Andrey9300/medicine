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
            'id' => '1',
            'name' => 'Дифтерия (АДС)',
            'period_id' => '6'
        ]);
        DB::table('researches')->insert([
            'id' => '2',
            'name' => 'Корь (ЖКВ)',
            'period_id' => '5'
        ]);
        DB::table('researches')->insert([
            'id' => '3',
            'name' => 'Гигиеническое обучение с аттестацией',
            'period_id' => '4'
        ]);
        DB::table('researches')->insert([
            'id' => '4',
            'name' => 'Терапевт',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '5',
            'name' => 'Психиатр',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '6',
            'name' => 'Нарколог',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '7',
            'name' => 'Дерматовенеролог (RW сифилис)',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '8',
            'name' => 'Оториноларинголог',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '9',
            'name' => 'Стоматолог',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '10',
            'name' => 'ФЛГ',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '11',
            'name' => 'Гельминты, энтеробиоз и протозоозы',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '12',
            'name' => 'Дизентирия Зонне',
            'period_id' => '3'
        ]);
        DB::table('researches')->insert([
            'id' => '13',
            'name' => 'Кишечные инфекции',
            'period_id' => '2'
        ]);
        DB::table('researches')->insert([
            'id' => '14',
            'name' => 'Брюшной тиф',
            'period_id' => '2'
        ]);
        DB::table('researches')->insert([
            'id' => '15',
            'name' => 'Стафилококк',
            'period_id' => '2'
        ]);
        DB::table('researches')->insert([
            'id' => '16',
            'name' => 'Вирусный гепатит А (ВГА)',
            'period_id' => '2'
        ]);
    }
}

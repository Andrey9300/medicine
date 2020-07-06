<?php

use Illuminate\Database\Seeder;

class AuditsGroupCriterionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('audits_group_criterion')->insert([
            'id' => 2,
            'user_id' => 1,
            'name' => 'Чек-лист №1 (Производство / Кухня)'
        ]);
        DB::table('audits_group_criterion')->insert([
            'id' => 3,
            'user_id' => 1,
            'name' => 'Чек-лист №2 (Моечные)'
        ]);
        DB::table('audits_group_criterion')->insert([
            'id' => 4,
            'user_id' => 1,
            'name' => 'Чек-лист №3 (Пищевые: Склады / Холодильники / Морозильники)'
        ]);
        DB::table('audits_group_criterion')->insert([
            'id' => 5,
            'user_id' => 1,
            'name' => 'Чек-лист №4 (Непищевые склады)'
        ]);
        DB::table('audits_group_criterion')->insert([
            'id' => 6,
            'user_id' => 1,
            'name' => 'Чек-лист №5 (Обеденный зал / Бар / Ресторан)'
        ]);
        DB::table('audits_group_criterion')->insert([
            'id' => 7,
            'user_id' => 1,
            'name' => 'Чек-лист №6 (Зона сортировки мусора)'
        ]);
        DB::table('audits_group_criterion')->insert([
            'id' => 8,
            'user_id' => 1,
            'name' => 'Чек-лист №7 (Приемка товара)'
        ]);
    }
}

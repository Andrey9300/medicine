<?php

use Illuminate\Database\Seeder;

class UserUnitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_units')->insert([
            'user_id' => 1,
            'name' => 'Отдел питания'
        ]);
        DB::table('user_units')->insert([
            'user_id' => 1,
            'name' => 'Отдел ресторанного обслуживания'
        ]);
        DB::table('user_units')->insert([
            'user_id' => 1,
            'name' => 'Отдел закупок (1 этаж)'
        ]);
        DB::table('user_units')->insert([
            'id' => 6,
            'user_id' => 2,
            'name' => 'Подразделение 6'
        ]);
    }
}

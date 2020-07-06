<?php

use Illuminate\Database\Seeder;

class AuditsUnitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('audits_units')->insert([
            'user_id' => 1,
            'name' => 'Отдел питания'
        ]);
        DB::table('audits_units')->insert([
            'user_id' => 1,
            'name' => 'Отдел ресторанного обслуживания'
        ]);
        DB::table('audits_units')->insert([
            'user_id' => 1,
            'name' => 'Отдел закупок (1 этаж)'
        ]);
        DB::table('audits_units')->insert([
            'user_id' => 2,
            'name' => 'Подразделение 6'
        ]);
    }
}

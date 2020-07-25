<?php

use Illuminate\Database\Seeder;

class AuditsUnitsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('audits_units')->insert([
            'name' => 'Отдел питания'
        ]);
        DB::table('audits_units')->insert([
            'name' => 'Отдел ресторанного обслуживания'
        ]);
        DB::table('audits_units')->insert([
            'name' => 'Отдел закупок (1 этаж)'
        ]);
        DB::table('audits_units')->insert([
            'name' => 'Подразделение 6'
        ]);

        // for demo user
        DB::table('audits_units')->insert([
            'id' => 5,
            'name' => 'Отдел питания'
        ]);
        DB::table('audits_units')->insert([
            'id' => 6,
            'name' => 'Отдел ресторанного обслуживания'
        ]);
        DB::table('audits_units')->insert([
            'id' => 7,
            'name' => 'Отдел закупок'
        ]);
    }
}

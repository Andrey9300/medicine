<?php

use Illuminate\Database\Seeder;

class EmployeeResearchTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employee_research')->insert([
            'employee_id' => '1',
            'research_id' => '1',
            'date' => '2017-01-01'
        ]);
    }
}

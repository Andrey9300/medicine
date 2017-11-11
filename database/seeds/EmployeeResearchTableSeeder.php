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
            'employee_id' => 1,
            'research_category_id' => 1,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 1,
            'research_category_id' => 2,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 1,
            'research_category_id' => 3,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 1,
            'research_category_id' => 4,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 2,
            'research_category_id' => 1,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 2,
            'research_category_id' => 2,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 2,
            'research_category_id' => 3,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 2,
            'research_category_id' => 4,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 1,
            'research_category_id' => 9,
            'date' => '2017-01-01'
        ]);
        DB::table('employee_research')->insert([
            'employee_id' => 1,
            'research_category_id' => 10,
            'date' => '2017-01-01'
        ]);
    }
}

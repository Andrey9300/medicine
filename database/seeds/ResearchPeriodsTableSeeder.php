<?php

use Illuminate\Database\Seeder;

class ResearchPeriodsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('research_periods')->insert([
            'id' => '1',
            'period' => '1',
            'name' => 'Раз в жизни',
        ]);
        DB::table('research_periods')->insert([
            'id' => '2',
            'period' => '-1',
            'name' => 'При поступлении на работу. При смене юридического лица',
        ]);
        DB::table('research_periods')->insert([
            'id' => '3',
            'period' => '365',
            'name' => 'Раз в год',
        ]);
        DB::table('research_periods')->insert([
            'id' => '4',
            'period' => '730',
            'name' => 'Раз в два года',
        ]);
        DB::table('research_periods')->insert([
            'id' => '5',
            'period' => '1827',
            'name' => 'Раз в 5 лет',
        ]);
        DB::table('research_periods')->insert([
            'id' => '6',
            'period' => '3653',
            'name' => 'Раз в 10 лет',
        ]);
    }
}

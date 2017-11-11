<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'id' => '1',
            'name' => 'Группа 20',
        ]);
        DB::table('categories')->insert([
            'id' => '2',
            'name' => 'Группа 21',
        ]);
        DB::table('categories')->insert([
            'id' => '3',
            'name' => 'Группа 22',
        ]);
    }
}

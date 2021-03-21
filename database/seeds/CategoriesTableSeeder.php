<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            'id' => 1,
            'name' => 'п. 26. Работы в организациях, деятельность которых связана с коммунальным и бытовым обслуживанием населения',
        ]);
        DB::table('categories')->insert([
            'id' => 2,
            'name' => 'п. 23. Общепит, торговля, пищевые производства',
        ]);
        DB::table('categories')->insert([
            'id' => 3,
            'name' => 'п. 25. Работы в организациях, деятельность которых связана с воспитанием и обучением детей',
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class UserOrganizationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_organization')->insert([
            'user_id' => 1,
            'organization_name' => 'ООО Мясокомбинат'
        ]);
        DB::table('user_organization')->insert([
            'user_id' => 2,
            'organization_name' => 'ОАО Рыбокомбинат'
        ]);
        DB::table('user_organization')->insert([
            'user_id' => 3,
            'organization_name' => 'ЗАО Хлебокобинат'
        ]);
        DB::table('user_organization')->insert([
            'user_id' => 4,
            'organization_name' => 'ООО Мясокомбинат'
        ]);
        DB::table('user_organization')->insert([
            'user_id' => 5,
            'organization_name' => 'ОАО Рыбокомбинат'
        ]);
        DB::table('user_organization')->insert([
            'user_id' => 6,
            'organization_name' => 'ЗАО Хлебокобинат'
        ]);
    }
}

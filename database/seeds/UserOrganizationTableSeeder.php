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
            'organization_id' => '1'
        ]);
        DB::table('user_organization')->insert([
            'user_id' => 2,
            'organization_id' => '2'
        ]);
        DB::table('user_organization')->insert([
            'user_id' => 3,
            'organization_id' => '3'
        ]);
//        DB::table('user_organization')->insert([
//            'user_id' => 4,
//            'organization_id' => '1'
//        ]);
//        DB::table('user_organization')->insert([
//            'user_id' => 5,
//            'organization_id' => '2'
//        ]);
//        DB::table('user_organization')->insert([
//            'user_id' => 6,
//            'organization_id' => '3'
//        ]);
        DB::table('user_organization')->insert([
            'user_id' => 1,
            'organization_id' => '4'
        ]);
//        DB::table('user_organization')->insert([
//            'user_id' => 4,
//            'organization_id' => '4'
//        ]);
        DB::table('user_organization')->insert([
            'user_id' => 1,
            'organization_id' => '5'
        ]);
//        DB::table('user_organization')->insert([
//            'user_id' => 4,
//            'organization_id' => '5'
//        ]);
    }
}

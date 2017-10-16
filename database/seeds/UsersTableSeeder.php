<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Шменко Иван Иванович',
            'email' => 'test@test.ru',
            'password' => bcrypt('secret'),
            'role' => 'admin',
            'remember_token' => '',
            'created_at' => '2009-06-04 18:14:56',
            'updated_at' => '2009-06-04 18:14:56',
            'organization_id' => '1',
        ]);
    }
}

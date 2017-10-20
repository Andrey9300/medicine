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
            'fio' => 'Шменко Иван Иванович',
            'password' => bcrypt('secret'),
            'date_birthday' => '1990-10-05',
            'date_employment' => '2017-10-05',
            'medical_book' => '123456789',
            'role' => 'admin',
            'email' => 'test@test.ru',
            'organization_name' => 'Объект 1',
            'remember_token' => '',
            'created_at' => '2009-06-04 18:14:56',
            'updated_at' => '2009-06-04 18:14:56'

        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class EmployeesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employees')->insert([
            'fio' => 'Иванов Иван Иванович',
            'date_employment' => '2017-10-05',
            'date_birthday' => '1990-10-05',
            'medical_book' => '123456789',
            'organization_head_email' => 'head_1@gmail.com',
        ]);

        DB::table('employees')->insert([
            'fio' => 'Петров Иван Иванович',
            'date_employment' => '2017-10-05',
            'date_birthday' => '1990-10-05',
            'medical_book' => '123456789',
            'organization_head_email' => 'head_1@gmail.com',
        ]);

        DB::table('employees')->insert([
            'fio' => 'Сидоров Иван Иванович',
            'date_employment' => '2017-10-05',
            'date_birthday' => '1990-10-05',
            'medical_book' => '123456789',
            'organization_head_email' => 'head_1@gmail.com',
        ]);

        DB::table('employees')->insert([
            'fio' => 'Скренко Иван Иванович',
            'date_employment' => '2017-10-05',
            'date_birthday' => '1990-10-05',
            'medical_book' => '123456789',
            'organization_head_email' => 'head_2@gmail.com',
        ]);

        DB::table('employees')->insert([
            'fio' => 'Бренко Иван Иванович',
            'date_employment' => '2017-10-05',
            'date_birthday' => '1990-10-05',
            'medical_book' => '123456789',
            'organization_head_email' => 'head_2@gmail.com',
        ]);

        DB::table('employees')->insert([
            'fio' => 'Шменко Иван Иванович',
            'date_employment' => '2017-10-05',
            'date_birthday' => '1990-10-05',
            'medical_book' => '123456789',
            'organization_head_email' => 'head_3@gmail.com',
        ]);
    }
}

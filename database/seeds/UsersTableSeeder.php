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
            'id' => 1,
            'fio' => 'Кренко Иван Иванович',
            'password' => bcrypt('secret'),
            'email' => 'krenko@meet.ru',
            'active' => true,
            'role' => 'admin'
        ]);
        DB::table('users')->insert([
            'id' => 2,
            'fio' => 'Паркин Иван АНатольевич',
            'password' => bcrypt('secret'),
            'email' => 'parkin@meet.ru',
            'active' => true,
            'role' => 'admin'
        ]);
        DB::table('users')->insert([
            'id' => 3,
            'fio' => 'Бренкин Дмитрий Иванович',
            'password' => bcrypt('secret'),
            'email' => 'brenkin@meet.ru',
            'active' => true,
            'role' => 'admin'
        ]);
        DB::table('users')->insert([
            'id' => 4,
            'fio' => 'Иванов Иван Иванович',
            'password' => bcrypt('demo'),
            'email' => 'demo',
            'active' => true,
            'role' => 'admin'
        ]);
    }
}

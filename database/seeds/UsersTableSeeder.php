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
            'fio' => 'Калин Олег Иванович',
            'password' => bcrypt('secret'),
            'email' => 'kalin@meet.ru',
            'active' => true,
            'role' => 'head'
        ]);
        DB::table('users')->insert([
            'id' => 5,
            'fio' => 'Бранин Василий Петрович',
            'password' => bcrypt('secret'),
            'email' => 'branin@meet.ru',
            'active' => true,
            'role' => 'head'
        ]);
        DB::table('users')->insert([
            'id' => 6,
            'fio' => 'Бран Петр Васильевич',
            'password' => bcrypt('secret'),
            'email' => 'bran@fish.ru',
            'active' => true,
            'role' => 'head'
        ]);
    }
}

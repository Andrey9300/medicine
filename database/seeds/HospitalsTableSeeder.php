<?php

use Illuminate\Database\Seeder;

class HospitalsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hospitals')->insert([
            'id' => '1',
            'name' => 'Медикал центр Константа',
            'address' => 'Москва улица Башкаряна, д. 5',
            'head_fio' => 'Зосимов Евгений Иванович',
            'shedule' => 'пн.- пт. 9.00-18.00 сб. 9.00-17.00, вс-вых.',
            'phone' => '8(495)-111-22-33',
            'user_id' => '1',
        ]);

        DB::table('hospitals')->insert([
            'id' => '2',
            'name' => 'Медикал центр Доктор',
            'address' => 'Москва улица Генкова, д. 19',
            'head_fio' => 'Габренко Петр Васильевич',
            'shedule' => 'пн.- пт. 9.00-18.00 сб. 9.00-17.00, вс-вых.',
            'phone' => '8(495)-111-22-33',
            'user_id' => '1',
        ]);

        DB::table('hospitals')->insert([
            'id' => '3',
            'name' => 'Медикал центр Ай болит',
            'address' => 'Москва улица Генкова, д. 19',
            'head_fio' => 'Габренко Петр Васильевич',
            'shedule' => 'пн.- пт. 9.00-18.00 сб. 9.00-17.00, вс-вых.',
            'phone' => '8(495)-111-22-33',
            'user_id' => '2',
        ]);

        DB::table('hospitals')->insert([
            'id' => '4',
            'name' => 'Медикал центр Здоровье',
            'address' => 'Москва улица Генкова, д. 19',
            'head_fio' => 'Габренко Петр Васильевич',
            'shedule' => 'пн.- пт. 9.00-18.00 сб. 9.00-17.00, вс-вых.',
            'phone' => '8(495)-111-22-33',
            'user_id' => '3',
        ]);
    }
}

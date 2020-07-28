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
            'id' => 1,
            'fio' => 'Кренко Иван Иванович',
            'date_birthday' => '1990-10-05',
            'date_employment' => '2017-10-05',
            'medical_book' => '10000',
            'user_id' => 1,
            'organization_name' => 'ООО Мясокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 2,
            'fio' => 'Паркин Иван Анатольевич',
            'date_birthday' => '1988-10-05',
            'date_employment' => '2015-09-05',
            'medical_book' => '10001',
            'user_id' => 1,
            'organization_name' => 'ООО Мясокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 3,
            'fio' => 'Бренкин Дмитрий Иванович',
            'date_birthday' => '1991-10-05',
            'date_employment' => '2017-01-05',
            'medical_book' => '10002',
            'user_id' => 1,
            'organization_name' => 'ООО Мясокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);
        DB::table('employees')->insert([
            'id' => 4,
            'fio' => 'Калин Олег Иванович',
            'date_birthday' => '1990-10-05',
            'date_employment' => '2016-12-05',
            'medical_book' => '10003',
            'user_id' => 1,
            'organization_name' => 'ООО Мясокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 5,
            'fio' => 'Бранин Василий Петрович',
            'date_birthday' => '1980-10-05',
            'date_employment' => '2015-04-10',
            'medical_book' => '10004',
            'user_id' => 1,
            'organization_name' => 'ООО Мясокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 6,
            'fio' => 'Бран Петр Васильевич',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2013-10-10',
            'medical_book' => '10005',
            'user_id' => 2,
            'organization_name' => 'ОАО Рыбокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);
        DB::table('employees')->insert([
            'id' => 7,
            'fio' => 'Василкин Иван Дмитриевич',
            'date_birthday' => '1990-10-05',
            'date_employment' => '2016-10-10',
            'medical_book' => '10006',
            'user_id' => 2,
            'organization_name' => 'ОАО Рыбокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 8,
            'fio' => 'Прен Анатолий Васильевич',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2017-05-01',
            'medical_book' => '10007',
            'user_id' => 2,
            'organization_name' => 'ОАО Рыбокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 9,
            'fio' => 'Пелен Василий Иванович',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2015-10-10',
            'medical_book' => '10008',
            'user_id' => 2,
            'organization_name' => 'ОАО Рыбокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);
        DB::table('employees')->insert([
            'id' => 10,
            'fio' => 'Карикин Петр Васильевич',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2017-04-04',
            'medical_book' => '10009',
            'user_id' => 2,
            'organization_name' => 'ОАО Рыбокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 11,
            'fio' => 'Калинс Иван Васильевич',
            'date_birthday' => '1990-11-19',
            'date_employment' => '2012-07-04',
            'medical_book' => '10010',
            'user_id' => 3,
            'organization_name' => 'ЗАО Хлебокобинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 12,
            'fio' => 'Пуркин Петр Васильевич',
            'date_birthday' => '1990-10-05',
            'date_employment' => '2017-04-04',
            'medical_book' => '10011',
            'user_id' => 3,
            'organization_name' => 'ЗАО Хлебокобинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);
        DB::table('employees')->insert([
            'id' => 13,
            'fio' => 'Белин Петр Васильевич',
            'date_birthday' => '1986-05-05',
            'date_employment' => '2016-05-14',
            'medical_book' => '10012',
            'user_id' => 3,
            'organization_name' => 'ЗАО Хлебокобинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 14,
            'fio' => 'Келкин Петр Васильевич',
            'date_birthday' => '1991-05-05',
            'date_employment' => '2014-10-04',
            'medical_book' => '10013',
            'user_id' => 3,
            'organization_name' => 'ЗАО Хлебокобинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 15,
            'fio' => 'Некин Петр Васильевич',
            'date_birthday' => '1991-01-05',
            'date_employment' => '2016-08-25',
            'medical_book' => '10014',
            'user_id' => 3,
            'organization_name' => 'ЗАО Хлебокобинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);

        DB::table('employees')->insert([
            'id' => 16,
            'fio' => 'Берин Василий Петрович',
            'date_birthday' => '1983-11-10',
            'date_employment' => '2016-04-10',
            'medical_book' => '10015',
            'user_id' => 1,
            'organization_name' => 'ОАО Сырокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);

        DB::table('employees')->insert([
            'id' => 17,
            'fio' => 'Перин Петрв Дмитриевич',
            'date_birthday' => '1990-09-01',
            'date_employment' => '2016-01-01',
            'medical_book' => '10016',
            'user_id' => 1,
            'organization_name' => 'ОАО Сырокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);

        DB::table('employees')->insert([
            'id' => 18,
            'fio' => 'Шен Василий Евгеньевич',
            'date_birthday' => '1989-10-10',
            'date_employment' => '2016-01-25',
            'medical_book' => '10017',
            'user_id' => 1,
            'organization_name' => 'ОАО Сырокомбинат',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);

        DB::table('employees')->insert([
            'id' => 19,
            'fio' => 'Кар Вадим Сергеевич',
            'date_birthday' => '1985-09-09',
            'date_employment' => '2017-08-20',
            'medical_book' => '10018',
            'user_id' => 1,
            'organization_name' => 'АО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);

        DB::table('employees')->insert([
            'id' => 20,
            'fio' => 'Петровкин Василий Иванович',
            'date_birthday' => '1980-10-01',
            'date_employment' => '2015-03-20',
            'medical_book' => '10019',
            'user_id' => 1,
            'organization_name' => 'АО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);

        DB::table('employees')->insert([
            'id' => 21,
            'fio' => 'Калин Дмитрий Васильевич',
            'date_birthday' => '1990-04-08',
            'date_employment' => '2014-01-10',
            'medical_book' => '10020',
            'user_id' => 1,
            'organization_name' => 'АО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);

        // for demo user
        DB::table('employees')->insert([
            'id' => 22,
            'fio' => 'Кренко Иван Иванович',
            'date_birthday' => '1990-10-05',
            'date_employment' => '2017-10-05',
            'medical_book' => '10000',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 23,
            'fio' => 'Паркин Иван Анатольевич',
            'date_birthday' => '1988-10-05',
            'date_employment' => '2015-09-05',
            'medical_book' => '10001',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 24,
            'fio' => 'Бренкин Дмитрий Иванович',
            'date_birthday' => '1991-10-05',
            'date_employment' => '2017-01-05',
            'medical_book' => '10002',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);
        DB::table('employees')->insert([
            'id' => 25,
            'fio' => 'Калин Олег Иванович',
            'date_birthday' => '1990-10-05',
            'date_employment' => '2016-12-05',
            'medical_book' => '10003',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 26,
            'fio' => 'Бранин Василий Петрович',
            'date_birthday' => '1980-10-05',
            'date_employment' => '2015-04-10',
            'medical_book' => '10004',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 27,
            'fio' => 'Бран Петр Васильевич',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2013-10-10',
            'medical_book' => '10005',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);
        DB::table('employees')->insert([
            'id' => 28,
            'fio' => 'Василкин Иван Дмитриевич',
            'date_birthday' => '1990-10-05',
            'date_employment' => '2016-10-10',
            'medical_book' => '10006',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
        DB::table('employees')->insert([
            'id' => 29,
            'fio' => 'Прен Анатолий Васильевич',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2017-05-01',
            'medical_book' => '10007',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '2'
        ]);
        DB::table('employees')->insert([
            'id' => 30,
            'fio' => 'Пелен Василий Иванович',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2015-10-10',
            'medical_book' => '10008',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '3'
        ]);
        DB::table('employees')->insert([
            'id' => 31,
            'fio' => 'Карикин Петр Васильевич',
            'date_birthday' => '1993-10-05',
            'date_employment' => '2017-04-04',
            'medical_book' => '10009',
            'user_id' => 4,
            'organization_name' => 'ООО Колбасный цех',
            'position' => 'Шеф повар',
            'comments' => '',
            'category_id' => '1'
        ]);
    }
}

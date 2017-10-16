<?php

use Illuminate\Database\Seeder;

class OrganizationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('organizations')->insert([
            'name' => 'Объект 1',
            'address' => 'Москва ул Центральная',
            'legal_entity' => 'Compass',
            'head_fio' => 'Петров Петр Петрович',
            'head_email' => 'head_1@gmail.com',
            'regional_email' => 'regional_1@gmail.com',
            'chef_email' => 'chef_1@gmail.com',
            'phone' => '+79991234567',
            'is_certification' => false,
        ]);

        DB::table('organizations')->insert([
            'name' => 'Объект 2',
            'address' => 'Москва ул Центральная',
            'legal_entity' => 'Compass',
            'head_fio' => 'Петров Петр Петрович',
            'head_email' => 'head_2@gmail.com',
            'regional_email' => 'regional_2@gmail.com',
            'chef_email' => 'chef_2@gmail.com',
            'phone' => '+79991234568',
            'is_certification' => false,
        ]);

        DB::table('organizations')->insert([
            'name' => 'Объект 3',
            'address' => 'Москва ул Центральная',
            'legal_entity' => 'Compass',
            'head_fio' => 'Петров Петр Петрович',
            'head_email' => 'head_3@gmail.com',
            'regional_email' => 'regional_3@gmail.com',
            'chef_email' => 'chef_3@gmail.com',
            'phone' => '+79991234569',
            'is_certification' => false,
        ]);
    }
}

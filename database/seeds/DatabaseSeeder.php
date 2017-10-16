<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(OrganizationsTableSeeder::class);
        $this->call(EmployeesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(HospitalsTableSeeder::class);
        $this->call(ResearchTableSeeder::class);
        $this->call(EmployeeResearchTableSeeder::class);
        $this->call(HospitalResearchTableSeeder::class);
    }
}

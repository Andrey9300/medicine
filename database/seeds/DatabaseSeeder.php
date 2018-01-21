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
        $this->call(RegionsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(ResearchPeriodsTableSeeder::class);
        $this->call(ResearchesTableSeeder::class);
        $this->call(ResearchesCategoryTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(LegalEntitiesTableSeeder::class);
        $this->call(OrganizationsTableSeeder::class);
        $this->call(UserOrganizationTableSeeder::class);
        $this->call(EmployeesTableSeeder::class);
        $this->call(HospitalsTableSeeder::class);
        $this->call(UsersResearchesTableSeeder::class);
    }
}

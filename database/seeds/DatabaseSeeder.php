<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(CategoriesTableSeeder::class);
        $this->call(ResearchPeriodsTableSeeder::class);
        $this->call(ResearchesTableSeeder::class);
        $this->call(ResearchesCategoryTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(OrganizationsTableSeeder::class);
        $this->call(UserOrganizationTableSeeder::class);
        $this->call(EmployeesTableSeeder::class);
        $this->call(HospitalsTableSeeder::class);
        $this->call(UsersResearchesTableSeeder::class);
        $this->call(UserCriterionsTableSeeder::class);
        $this->call(UserLocationsTableSeeder::class);
        $this->call(UserPlacesTableSeeder::class);
        $this->call(UserUnitsTableSeeder::class);
        $this->call(UserGroupCriterionTableSeeder::class);
    }
}

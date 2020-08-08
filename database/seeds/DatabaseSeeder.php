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

        $this->call(AuditsCriterionsTableSeeder::class);
        $this->call(AuditsUnitsTableSeeder::class);
        $this->call(AuditsLocationsTableSeeder::class);
        $this->call(AuditsPlacesTableSeeder::class);
        $this->call(AuditsGroupCriterionTableSeeder::class);
        $this->call(AuditsGroupCriterionListTableSeeder::class);
        $this->call(AuditsCriterionListsTableSeeder::class);

        $this->call(UserGroupCriterionListTableSeeder::class);
        $this->call(UserCriterionListsTableSeeder::class);
        $this->call(UserGroupCriterionTableSeeder::class);

        $this->call(UserCriterionsTableSeeder::class);

        $this->call(UserUnitsTableSeeder::class);

        $this->call(PestLocationTableSeeder::class);
        $this->call(PestUserLocationTableSeeder::class);
        $this->call(PestPlaceTableSeeder::class);
    }
}

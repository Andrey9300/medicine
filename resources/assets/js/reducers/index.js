import {combineReducers} from 'redux';
import hospitals from './HospitalsReducer';
import organizations from './OrganizationsReducer';
import researches from './ResearchesReducer';
import employees from './EmployeesReducer';
import users from './UsersReducer';
import regions from './RegionsReducer';
import categories from './CategoriesReducer';
import researchPeriods from './ResearchPeriodsReducer';
import legalEntities from './LegalEntitiesReducer';

export default combineReducers({
    hospitals,
    organizations,
    researches,
    employees,
    users,
    regions,
    categories,
    researchPeriods,
    legalEntities
});

import {combineReducers} from 'redux';
import hospitals from './HospitalsReducer';
import organizations from './OrganizationsReducer';
import researches from './ResearchesReducer';
import employees from './EmployeesReducer';
import users from './UsersReducer';
import categories from './CategoriesReducer';
import researchPeriods from './ResearchPeriodsReducer';

export default combineReducers({
  hospitals,
  organizations,
  researches,
  employees,
  users,
  categories,
  researchPeriods,
});

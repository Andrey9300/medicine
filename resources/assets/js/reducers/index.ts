import {combineReducers} from 'redux';
import hospitals from './HospitalsReducer';
import organizations from './OrganizationsReducer';
import researches from './ResearchesReducer';
import employees from './EmployeesReducer';
import users from './UsersReducer';
import categories from './CategoriesReducer';
import researchPeriods from './ResearchPeriodsReducer';
import {auditorsReducer} from './AuditorsReducer';
import criterions from './CriterionsReducer';
import units from './UnitsReducer';
import locations from './LocationsReducer';
import places from './PlacesReducer';
import groupCriterions from './GroupCriterionsReducer';
import criterionLists from './CriterionListReducer';
import groupCriterionLists from './GroupCriterionListsReducer';
import placeCheckLists from './PlaceCheckListsReducer';

export const reducer = combineReducers({
  hospitals,
  organizations,
  researches,
  employees,
  users,
  categories,
  researchPeriods,
  auditorsReducer,
  criterions,
  units,
  locations,
  places,
  groupCriterions,
  groupCriterionLists,
  criterionLists,
  placeCheckLists,
});

export type TState = ReturnType<typeof reducer>;

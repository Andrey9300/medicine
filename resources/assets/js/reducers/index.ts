import {combineReducers} from 'redux';
import hospitals from './lmk/HospitalsReducer';
import organizations from './lmk/OrganizationsReducer';
import researches from './lmk/ResearchesReducer';
import employees from './lmk/EmployeesReducer';
import users from './UsersReducer';
import categories from './lmk/CategoriesReducer';
import researchPeriods from './lmk/ResearchPeriodsReducer';
import {auditors} from './audit/AuditorsReducer';
import criterions from './audit/CriterionsReducer';
import units from './audit/UnitsReducer';
import locations from './audit/LocationsReducer';
import places from './audit/PlacesReducer';
import groupCriterions from './audit/GroupCriterionsReducer';
import groupCriterionLists from './audit/GroupCriterionListsReducer';
import placeCheckLists from './audit/PlaceCheckListsReducer';

export const reducer = combineReducers({
  hospitals,
  organizations,
  researches,
  employees,
  users,
  categories,
  researchPeriods,
  auditors,
  criterions,
  units,
  locations,
  places,
  groupCriterions,
  groupCriterionLists,
  placeCheckLists,
});

export type TState = ReturnType<typeof reducer>;

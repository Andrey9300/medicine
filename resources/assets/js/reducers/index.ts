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
import {pestLocation} from './pest/PestLocation';
import {pestPlace} from './pest/PestPlace';
import {pestControl} from './pest/PestControl';

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
  pestLocation,
  pestPlace,
  pestControl,
});

export type TState = ReturnType<typeof reducer>;

import {combineReducers} from 'redux';
import hospitals from './HospitalsReducer';
import organizations from './OrganizationsReducer';
import researches from './ResearchesReducer';
import users from './UsersReducer';

export default combineReducers({
    hospitals,
    organizations,
    researches,
    users
});

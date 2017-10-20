import {combineReducers} from 'redux';
import hospitals from './HospitalsReducer';
import organizations from './OrganizationsReducer';
import researches from './ResearchesReducer';

export default combineReducers({
    hospitals,
    organizations,
    researches
});

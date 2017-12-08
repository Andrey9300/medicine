import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Route, Router, hashHistory} from 'react-router';

import Login from './components/includes/Login';
import Registration from './components/includes/Registration';
import RestorePassword from './components/includes/RestorePassword';
import ResetPassword from './components/includes/ResetPassword';
import ActivateAccount from './components/includes/ActivateAccount';

import EditLegalEntity from './components/legalEntity/Edit';
import LegalEntity from './components/legalEntity/LegalEntity';
import LegalEntities from './components/legalEntity/LegalEntities';
import NewLegalEntity from './components/legalEntity/New';
import LegalEntityEmployees from './components/legalEntity/LegalEntityEmployees';
import LegalEntityOrganizations from './components/legalEntity/LegalEntityOrganizations';
import LegalEntityExpiredOrganizations from './components/legalEntity/LegalEntityExpiredOrganizations';
import LegalEntityExpiredEmployees from './components/legalEntity/LegalEntityExpiredEmployees';
import LegalEntityEndsEmployees from './components/legalEntity/LegalEntityEndsEmployees';

import EditHospital from './components/hospital/Edit';
import Hospital from './components/hospital/Hospital';
import Hospitals from './components/hospital/Hospitals';
import NewHospital from './components/hospital/New';

import HospitalResearches from './components/hospital/research/HospitalResearches';

import EditOrganization from './components/organization/Edit';
import Organization from './components/organization/Organization';
import Organizations from './components/organization/Organizations';
import NewOrganization from './components/organization/New';
import OrganizationEmployees from './components/organization/OrganizationEmployees';
import NewOrganizationEmployee from './components/organization/employee/New';
import OrganizationBudget from './components/organization/budget/Budget';

import EditResearch from './components/research/Edit';
import Researches from './components/research/Researches';
import NewResearch from './components/research/New';

import EditEmployee from './components/employee/Edit';
import PrintEmployee from './components/employee/PrintResearch';
import Employee from './components/employee/Employee';
import Employees from './components/employee/Employees';
import NewEmployee from './components/employee/New';

import EmployeeResearches from './components/employee/research/EmployeeResearches';

import Layout from './components/Layout';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router history = { hashHistory }>
            <Route path = "/" component = { Layout }>
                <IndexRoute component = { Organizations }/>
                <Route path = "login" component = { Login }/>
                <Route path = "registration" component = { Registration }/>
                <Route path = "restorePassword" component = { RestorePassword }/>
                <Route path = "resetPassword" component = { ResetPassword }/>
                <Route path = "activateAccount" component = { ActivateAccount }/>

                <Route path = "legalEntities" component={LegalEntities}/>
                <Route path = "legalEntities/create" component = { NewLegalEntity }/>
                <Route path = "legalEntities/employees/:legalEntityId" component = { LegalEntityEmployees }/>
                <Route path = "legalEntities/organizations/:legalEntityId" component = { LegalEntityOrganizations }/>
                <Route path = "legalEntities/expiredOrganizations/:legalEntityId" component = { LegalEntityExpiredOrganizations }/>
                <Route path = "legalEntities/expiredEmployees/:legalEntityId" component = { LegalEntityExpiredEmployees }/>
                <Route path = "legalEntities/endsEmployees/:legalEntityId" component = { LegalEntityEndsEmployees }/>
                <Route path = "legalEntities/:id" component = { LegalEntity }/>
                <Route path = "legalEntities/edit/:id" component = { EditLegalEntity }/>

                <Route path = "hospitals" component={Hospitals}/>
                <Route path = "hospitals/create" component = { NewHospital }/>
                <Route path = "hospitals/:id" component = { Hospital }/>
                <Route path = "hospitals/edit/:id" component = { EditHospital }/>
                <Route path = "hospitals/researches/:idHospital" component = { HospitalResearches }/>

                <Route path = "organizations" component = { Organizations }/>
                <Route path = "organizations/create" component = { NewOrganization }/>
                <Route path = "organizations/employees/create/:idOrganization" component = { NewOrganizationEmployee }/>
                <Route path = "organizations/employees/:idOrganization" component = { OrganizationEmployees }/>
                <Route path = "organizations/budget/:idOrganization" component = { OrganizationBudget }/>
                <Route path = "organizations/edit/:id" component = { EditOrganization }/>
                <Route path = "organizations/:id" component = { Organization }/>

                <Route path = "researches" component = { Researches }/>
                <Route path = "researches/create" component = { NewResearch }/>
                <Route path = "researches/edit/:id" component = { EditResearch }/>

                <Route path = "employees" component = { Employees }/>
                <Route path = "employees/create" component = { NewEmployee }/>
                <Route path = "employees/:id" component = { Employee }/>
                <Route path = "employees/edit/:id" component = { EditEmployee }/>
                <Route path = "employees/print/:id" component = { PrintEmployee }/>
                <Route path = "employees/researches/:idEmployee" component = { EmployeeResearches }/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

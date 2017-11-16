import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Route, Router, hashHistory} from 'react-router';

import Login from './components/includes/Login';
import Registration from './components/includes/Registration';

import EditHospital from './components/hospital/Edit';
import Hospital from './components/hospital/Hospital';
import Hospitals from './components/hospital/Hospitals';
import NewHospital from './components/hospital/New';

import HospitalResearches from './components/hospital/research/HospitalResearches';
import EditHospitalResearch from './components/hospital/research/EditHospitalResearch';
import NewHospitalResearch from './components/hospital/research/NewHospitalResearch';

import EditOrganization from './components/organization/Edit';
import Organization from './components/organization/Organization';
import Organizations from './components/organization/Organizations';
import NewOrganization from './components/organization/New';
import OrganizationEmployees from './components/organization/OrganizationEmployees';
import NewOrganizationEmployee from './components/organization/employee/New';

import EditResearch from './components/research/EditResearch';
import Researches from './components/research/Researches';
import NewResearch from './components/research/NewResearch';

import EditEmployee from './components/employee/Edit';
import PrintEmployee from './components/employee/PrintResearch';
import Employee from './components/employee/Employee';
import Employees from './components/employee/Employees';
import NewEmployee from './components/employee/New';

import EmployeeResearches from './components/employee/research/EmployeeResearches';
import EditEmployeeResearch from './components/employee/research/EditResearch';
import NewEmployeeResearch from './components/employee/research/NewResearch';

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

                <Route path = "hospitals" component={Hospitals}/>
                <Route path = "hospitals/create" component = { NewHospital }/>
                <Route path = "hospitals/:id" component = { Hospital }/>
                <Route path = "hospitals/edit/:id" component = { EditHospital }/>

                <Route path = "hospitals/researches/:idHospital" component = { HospitalResearches }/>
                <Route path = "hospitals/researches/:idHospital/create" component = { NewHospitalResearch }/>
                <Route path = "hospitals/researches/edit/:idHospital/:idResearch" component = { EditHospitalResearch }/>

                <Route path = "organizations" component = { Organizations }/>
                <Route path = "organizations/create" component = { NewOrganization }/>
                <Route path = "organizations/:id" component = { Organization }/>
                <Route path = "organizations/employees/create/:idOrganization" component = { NewOrganizationEmployee }/>
                <Route path = "organizations/employees/:idOrganization" component = { OrganizationEmployees }/>
                <Route path = "organizations/edit/:id" component = { EditOrganization }/>

                <Route path = "researches" component = { Researches }/>
                <Route path = "researches/create" component = { NewResearch }/>
                <Route path = "researches/edit/:id" component = { EditResearch }/>

                <Route path = "employees" component = { Employees }/>
                <Route path = "employees/create" component = { NewEmployee }/>
                <Route path = "employees/:id" component = { Employee }/>
                <Route path = "employees/edit/:id" component = { EditEmployee }/>
                <Route path = "employees/print/:id" component = { PrintEmployee }/>

                <Route path = "employees/researches/:idEmployee" component = { EmployeeResearches }/>
                <Route path = "employees/researches/:idEmployee/create" component = { NewEmployeeResearch }/>
                <Route path = "employees/researches/edit/:idEmployee/:idResearch" component = { EditEmployeeResearch }/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

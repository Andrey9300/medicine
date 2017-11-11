import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Route, Router, hashHistory} from 'react-router';

import Login from './components/includes/Login';

import EditHospital from './components/hospital/EditHospital';
import Hospital from './components/hospital/Hospital';
import Hospitals from './components/hospital/Hospitals';
import NewHospital from './components/hospital/NewHospital';

import HospitalResearches from './components/hospital/research/HospitalResearches';
import EditHospitalResearch from './components/hospital/research/EditHospitalResearch';
import NewHospitalResearch from './components/hospital/research/NewHospitalResearch';

import EditOrganization from './components/organization/EditOrganization';
import Organization from './components/organization/Organization';
import Organizations from './components/organization/Organizations';
import NewOrganization from './components/organization/NewOrganization';
import OrganizationUsers from './components/organization/OrganizationUsers';

import EditResearch from './components/research/EditResearch';
import Researches from './components/research/Researches';
import NewResearch from './components/research/NewResearch';

import EditUser from './components/user/EditUser';
import PrintUser from './components/user/PrintUser';
import User from './components/user/User';
import Users from './components/user/Users';
import NewUser from './components/user/NewUser';

import UserResearches from './components/user/research/UserResearches';
import EditUserResearch from './components/user/research/EditUserResearch';
import NewUserResearch from './components/user/research/NewUserResearch';

import requireAuthentication from './components/includes/Authenticated';

import Layout from './components/Layout';
import {Provider} from 'react-redux';
import store from './store';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history = { hashHistory }>
            <Route path = "/" component = { Layout }>
                <IndexRoute component = { Organizations }/>
                <Route path = "login" component = { Login }/>

                <Route path = "hospitals" component={requireAuthentication(Hospitals)}/>
                <Route path = "hospitals/create" component = { NewHospital }/>
                <Route path = "hospitals/:id" component = { Hospital }/>
                <Route path = "hospitals/edit/:id" component = { EditHospital }/>

                <Route path = "hospitals/researches/:idHospital" component = { HospitalResearches }/>
                <Route path = "hospitals/researches/:idHospital/create" component = { NewHospitalResearch }/>
                <Route path = "hospitals/researches/edit/:idHospital/:idResearch" component = { EditHospitalResearch }/>

                <Route path = "organizations" component = { Organizations }/>
                <Route path = "organizations/create" component = { NewOrganization }/>
                <Route path = "organizations/:id" component = { Organization }/>
                <Route path = "organizations/users/:idOrganization" component = { OrganizationUsers }/>
                <Route path = "organizations/edit/:id" component = { EditOrganization }/>

                <Route path = "researches" component = { Researches }/>
                <Route path = "researches/create" component = { NewResearch }/>
                <Route path = "researches/edit/:id" component = { EditResearch }/>

                <Route path = "users" component = { Users }/>
                <Route path = "users/create" component = { NewUser }/>
                <Route path = "users/:id" component = { User }/>
                <Route path = "users/edit/:id" component = { EditUser }/>
                <Route path = "users/print/:id" component = { PrintUser }/>

                <Route path = "users/researches/:idUser" component = { UserResearches }/>
                <Route path = "users/researches/:idUser/create" component = { NewUserResearch }/>
                <Route path = "users/researches/edit/:idUser/:idResearch" component = { EditUserResearch }/>
            </Route>
        </Router>
    </Provider>,
    app
);

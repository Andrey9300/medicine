import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Route, Router, hashHistory} from 'react-router';

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

import EditResearch from './components/research/EditResearch';
import Researches from './components/research/Researches';
import NewResearch from './components/research/NewResearch';

import EditUser from './components/user/EditUser';
import User from './components/user/User';
import Users from './components/user/Users';
import NewUser from './components/user/NewUser';

import UserResearches from './components/user/research/UserResearches';
import EditUserResearch from './components/user/research/EditUserResearch';
import NewUserResearch from './components/user/research/NewUserResearch';

import Layout from './components/Layout';
import {Provider} from 'react-redux';
import store from './store';
const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history = { hashHistory }>
            <Route path = "/" component = { Layout }>
                <IndexRoute component = { Organizations }></IndexRoute>
                <Route path = "hospitals/:id" component = { Hospital }></Route>
                <Route path = "hospitals" component = { Hospitals }></Route>
                <Route path = "hospitals/create" component = { NewHospital }></Route>
                <Route path = "hospitals/edit/:id" component = { EditHospital }></Route>

                <Route path = "hospitals/researches/:idHospital" component = { HospitalResearches }></Route>
                <Route path = "hospitals/researches/:idHospital/create" component = { NewHospitalResearch }></Route>
                <Route path = "hospitals/researches/edit/:idHospital/:idResearch" component = { EditHospitalResearch }></Route>

                <Route path = "organizations/:id" component = { Organization }></Route>
                <Route path = "organizations" component = { Organizations }></Route>
                <Route path = "organizations/create" component = { NewOrganization }></Route>
                <Route path = "organizations/edit/:id" component = { EditOrganization }></Route>

                <Route path = "researches" component = { Researches }></Route>
                <Route path = "researches/create" component = { NewResearch }></Route>
                <Route path = "researches/edit/:id" component = { EditResearch }></Route>

                <Route path = "users/:id" component = { User }></Route>
                <Route path = "users" component = { Users }></Route>
                <Route path = "users/create" component = { NewUser }></Route>
                <Route path = "users/edit/:id" component = { EditUser }></Route>

                <Route path = "users/researches/:idUser" component = { UserResearches }></Route>
                <Route path = "users/researches/:idUser/create" component = { NewUserResearch }></Route>
                <Route path = "users/researches/edit/:idUser/:idResearch" component = { EditUserResearch }></Route>
            </Route>
        </Router>
    </Provider>,
    app
);

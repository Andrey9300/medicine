import './bootstrap';
import {IndexRoute, Route, Router, hashHistory} from 'react-router';
import EditHospital from './components/hospital/EditHospital';
import Hospitals from './components/hospital/Hospitals';
import NewHospital from './components/hospital/NewHospital';

import EditOrganization from './components/organization/EditOrganization';
import Organizations from './components/organization/Organizations';
import NewOrganization from './components/organization/NewOrganization';

import EditResearch from './components/research/EditResearch';
import Researches from './components/research/Researches';
import NewResearch from './components/research/NewResearch';

import Layout from './components/Layout';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history = { hashHistory }>
            <Route path = "/" component = { Layout }>
                <IndexRoute component = { Hospitals }></IndexRoute>
                <Route path = "hospitals" component = { Hospitals }></Route>
                <Route path = "hospitals/create" component = { NewHospital }></Route>
                <Route path = "hospitals/edit/:id" component = { EditHospital }></Route>

                <Route path = "organizations" component = { Organizations }></Route>
                <Route path = "organizations/create" component = { NewOrganization }></Route>
                <Route path = "organizations/edit/:id" component = { EditOrganization }></Route>

                <Route path = "researches" component = { Researches }></Route>
                <Route path = "researches/create" component = { NewResearch }></Route>
                <Route path = "researches/edit/:id" component = { EditResearch }></Route>
            </Route>
        </Router>
    </Provider>,
    app
);

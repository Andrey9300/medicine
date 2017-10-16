import './bootstrap';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import Articles from './components/Articles';
import Home from './components/Home';
import Layout from './components/Layout';
import Organizations from './components/Organizations';
import React from 'react';
import ReactDOM from 'react-dom';
import Users from './components/Users';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="users" component={Users}></Route>
            <Route path="articles" component={Articles}></Route>
            <Route path="organizations" component={Organizations}></Route>
        </Route>
    </Router>,
    app
);

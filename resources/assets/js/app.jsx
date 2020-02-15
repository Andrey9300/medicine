import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {Provider} from 'react-redux';
import {store} from './store';
import Header from './components/includes/Header';
import Sidebar from './components/includes/Sidebar';
import Footer from './components/includes/Footer';
import {Routes} from './components/route/Routes';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar location={location}/>
          <main className="main">
            <Routes/>
          </main>
        </div>
        <Footer/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);

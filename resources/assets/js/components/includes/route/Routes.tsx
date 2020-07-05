import React from 'react';
import {Route} from 'react-router-dom';

import Login from '../Login';
import Registration from '../Registration';
import RestorePassword from '../RestorePassword';
import ResetPassword from '../ResetPassword';
import ActivateAccount from '../ActivateAccount';
import {UserContainer} from '../../user/User';
import {EditUserContainer} from '../../user/Edit';
import {NewUserContainer} from '../../user/New';
import {CurrentUserContainer} from '../../user/CurrentUser';
import {LmkRoutes} from './LmkRoutes';
import {AuditsRoutes} from './AuditsRoutes';

export class Routes extends React.PureComponent {
  render() {
    return (
      <>
        <Route
          exact
          path="/services/login"
          component={(props: any) => <Login {...props} />}
        />
        <Route
          exact
          path="/services/registration"
          component={(props: any) => <Registration {...props} />}
        />
        <Route
          exact
          path="/services/restorePassword"
          component={(props: any) => <RestorePassword {...props} />}
        />
        <Route
          exact
          path="/services/resetPassword"
          component={(props: any) => <ResetPassword {...props} />}
        />
        <Route
          exact
          path="/services/activateAccount"
          component={(props: any) => <ActivateAccount {...props} />}
        />
        <Route
          exact
          path="/services/profile"
          component={(props: any) => <CurrentUserContainer {...props} />}
        />
        <Route
          exact
          path="/services/profiles/:id"
          component={(props: any) => <UserContainer {...props} />}
        />
        <Route
          exact
          path="/services/profiles/edit/:id"
          component={(props: any) => <EditUserContainer {...props} />}
        />
        <Route
          exact
          path="/services/profiles/create"
          component={(props: any) => <NewUserContainer {...props} />}
        />
        <LmkRoutes />
        <AuditsRoutes />
      </>
    );
  }
}

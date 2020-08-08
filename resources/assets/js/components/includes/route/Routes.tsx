import React from 'react';
import {Route} from 'react-router-dom';

import {LoginContainer} from '../Login';
import {RegistrationContainer} from '../Registration';
import {RestorePasswordComponent} from '../RestorePassword';
import {ResetPasswordComponent} from '../ResetPassword';
import ActivateAccount from '../ActivateAccount';
import {UserContainer} from '../../user/User';
import {EditUserContainer} from '../../user/Edit';
import {NewUserContainer} from '../../user/New';
import {CurrentUserContainer} from '../../user/CurrentUser';
import {LmkRoutes} from './LmkRoutes';
import {AuditsRoutes} from './AuditsRoutes';
import {PestRoutes} from "./PestRoutes";

export class Routes extends React.PureComponent {
  render() {
    return (
      <>
        <Route
          exact
          path="/services/login"
          component={(props: any) => <LoginContainer {...props} />}
        />
        <Route
          exact
          path="/services/registration"
          component={(props: any) => <RegistrationContainer {...props} />}
        />
        <Route
          exact
          path="/services/restorePassword"
          component={(props: any) => <RestorePasswordComponent {...props} />}
        />
        <Route
          exact
          path="/services/resetPassword"
          component={(props: any) => <ResetPasswordComponent {...props} />}
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
        <PestRoutes />
      </>
    );
  }
}

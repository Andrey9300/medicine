import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {logoutUser} from '../../../actions/userActions';
import {Nav, NavItem} from 'reactstrap';
import {TState} from '../../../reducers';
import {LmkSidebarComponent} from './LmkSidebar';
import {AuditSidebarComponent} from './AuditSidebar';
import {PestSidebarComponent} from './PestSidebar';

interface IStateProps {
  currentUser: {
    isAuthenticated: boolean;
  };
}

interface IDispatchProps {
  logoutUser: typeof logoutUser;
}

interface IProps extends IStateProps, IDispatchProps {}

class SidebarComponent extends React.PureComponent<IProps> {
  private logout = (event: any) => {
    event.preventDefault();
    const {logoutUser} = this.props;

    logoutUser();
  };

  render() {
    const {currentUser} = this.props;
    let navItems;

    if (currentUser && currentUser.isAuthenticated) {
      navItems = (
        <Nav>
          <NavItem>
            <Link to={'/services/profile'}>
              <i className="fa fa-user-o" aria-hidden="true" /> Профиль
            </Link>
          </NavItem>
          <LmkSidebarComponent />
          <AuditSidebarComponent />
          <PestSidebarComponent />
          <NavItem>
            <Link to={'/services/lmk/'} onClick={this.logout}>
              <i className="fa fa-lock" aria-hidden="true" /> Выход
            </Link>
          </NavItem>
        </Nav>
      );
    } else {
      navItems = (
        <Nav>
          <NavItem>
            <Link to={'/services/login'}>
              <i className="fa fa-lock" aria-hidden="true" /> Вход
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/services/registration'}>
              <i className="fa fa-lock" aria-hidden="true" /> Регистрация
            </Link>
          </NavItem>
        </Nav>
      );
    }

    return (
      <div className="sidebar">
        {navItems}
        <button className="sidebar-minimizer brand-minimizer" type="button" />
      </div>
    );
  }
}

const mapStateToProps = (state: TState): IStateProps => {
  return {
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarComponent);

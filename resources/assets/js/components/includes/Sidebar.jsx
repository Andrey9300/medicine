import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {logoutUser} from '../../actions/userActions';
import {Nav, NavItem} from 'reactstrap';

class Sidebar extends Component {
  logout(event) {
    event.preventDefault();
    this.props.dispatch(logoutUser());
  }

  render() {
    const {user, location: {pathname}} = this.props;
    const organizationsClass = pathname.match(/^\/organizations/) ? 'active' : '';
    const employeesClass = pathname.match(/^\/employees/) ? 'active' : '';
    const hospitalsClass = pathname.match(/^\/hospitals/) ? 'active' : '';
    const researchesClass = pathname.match(/^\/researches/) ? 'active' : '';
    let navItems = null;

    if (user && user.isAuthenticated) {
      navItems =
        <Nav>
          <NavItem>
            <Link to={'/organizations'} className={organizationsClass}>
              <i className="fa fa-building-o" aria-hidden="true"/>Объекты
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/employees'} className={employeesClass}>
              <i className="fa fa-users" aria-hidden="true"/>Сотрудники
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/hospitals'} className={hospitalsClass}>
              <i className="fa fa-stethoscope" aria-hidden="true"/>Медицинские центры
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/researches'} className={researchesClass}>
              <i className="fa fa-heartbeat" aria-hidden="true"/>Исследования
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'#'} onClick={this.logout.bind(this)}>
              <i className="fa fa-lock" aria-hidden="true"/>Выход
            </Link>
          </NavItem>
        </Nav>;
    } else {
      navItems =
        <Nav>
          <NavItem>
            <Link to={'/login'}>
              <i className="fa fa-lock" aria-hidden="true"/>Вход
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/registration'}>
              <i className="fa fa-lock" aria-hidden="true"/>Регистрация
            </Link>
          </NavItem>
        </Nav>;
    }

    return (
      <div className="sidebar">
        {navItems}
        <button className="sidebar-minimizer brand-minimizer" type="button"/>
      </div>
    );
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    research: state.researches.research,
    user: state.users.user
  };
};

export default connect(mapStateToProps)(Sidebar);

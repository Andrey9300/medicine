import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {logoutUser} from '../../actions/userActions';
import {Nav, NavItem, Collapse} from 'reactstrap';

class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapseLmk: false,
      collapseAudit: false,
    };

    this.toggleLmk = this.toggleLmk.bind(this);
    this.toggleAudit = this.toggleAudit.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.dispatch(logoutUser());
  }

  toggleLmk() {
    const {collapseLmk} = this.state;
    this.setState({collapseLmk: !collapseLmk});
  }

  toggleAudit() {
    const {collapseAudit} = this.state;
    this.setState({collapseAudit: !collapseAudit});
  }

  render() {
    const {collapseLmk, collapseAudit} = this.state;
    const {
      currentUser,
      history: {
        location: {hash},
      },
    } = this.props;
    const profileClass = hash.includes('profile') ? 'active' : '';
    const organizationsClass = hash.includes('organizations') ? 'active' : '';
    const employeesClass = hash.includes('employees') ? 'active' : '';
    const hospitalsClass = hash.includes('hospitals') ? 'active' : '';
    const researchesClass = hash.includes('researches') ? 'active' : '';
    let navItems = null;

    if (currentUser && currentUser.isAuthenticated) {
      navItems = (
        <Nav>
          <NavItem>
            <Link to={'/profile'} className={profileClass}>
              <i className="fa fa-user-o" aria-hidden="true" /> Профиль
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/organizations'} className={organizationsClass}>
              <i className="fa fa-building-o" aria-hidden="true" /> Объекты
            </Link>
          </NavItem>

          <NavItem onClick={this.toggleLmk}>
            <Link to={'#'} className={employeesClass}>
              <i className="fa fa-user-md" aria-hidden="true" /> ЛМК
            </Link>
          </NavItem>
          <Collapse isOpen={collapseLmk}>
            <NavItem>
              <Link to={'/employees'} className={employeesClass}>
                <i className="fa fa-users" aria-hidden="true" /> Сотрудники
              </Link>
            </NavItem>
            <NavItem>
              <Link to={'/hospitals'} className={hospitalsClass}>
                <i className="fa fa-stethoscope" aria-hidden="true" />{' '}
                Медицинские центры
              </Link>
            </NavItem>
            <NavItem>
              <Link to={'/researches'} className={researchesClass}>
                <i className="fa fa-heartbeat" aria-hidden="true" />{' '}
                Исследования
              </Link>
            </NavItem>
          </Collapse>

          <NavItem onClick={this.toggleAudit}>
            <Link to={'#'} className={researchesClass}>
              <i className="fa fa-search" aria-hidden="true" /> Аудит
            </Link>
          </NavItem>
          <Collapse isOpen={collapseAudit}>
            <NavItem>
              <Link to={'/auditors'} className={researchesClass}>
                <i className="fa fa-user-circle" aria-hidden="true" /> Аудиторы
              </Link>
            </NavItem>
            <NavItem>
              <Link to={'/criterionLists'} className={researchesClass}>
                <i className="fa fa-book" aria-hidden="true" /> Чек-листы
              </Link>
            </NavItem>
            <NavItem>
              <Link to={'/structureCheckList'} className={researchesClass}>
                <i className="fa fa-book" aria-hidden="true" /> Структура чек-листа
              </Link>
            </NavItem>
          </Collapse>

          <NavItem>
            <Link to={'/'} onClick={this.logout.bind(this)}>
              <i className="fa fa-lock" aria-hidden="true" /> Выход
            </Link>
          </NavItem>
        </Nav>
      );
    } else {
      navItems = (
        <Nav>
          <NavItem>
            <Link to={'/login'}>
              <i className="fa fa-lock" aria-hidden="true" /> Вход
            </Link>
          </NavItem>
          <NavItem>
            <Link to={'/registration'}>
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

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(Sidebar);

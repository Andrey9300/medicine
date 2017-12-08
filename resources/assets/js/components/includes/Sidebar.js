import React, {Component} from 'react';
import {logoutUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Nav, NavItem, NavLink
} from 'reactstrap';

class Sidebar extends Component {
    logout(event) {
        event.preventDefault();
        this.props.dispatch(logoutUser());
    }

    render() {
        const {location} = this.props;
        const homeClass = location.pathname === '/' ? 'active' : '';
        const legalEntitiesClass = location.pathname.match(/^\/legalEntities/) ? 'active' : '';
        const organizationsClass = location.pathname.match(/^\/organizations/) ? 'active' : '';
        const employeesClass = location.pathname.match(/^\/employees/) ? 'active' : '';
        const hospitalsClass = location.pathname.match(/^\/hospitals/) ? 'active' : '';
        const researchesClass = location.pathname.match(/^\/researches/) ? 'active' : '';

        return (
            <div className="sidebar">
                <Nav>
                    <NavItem>
                        <NavLink href="#/" className={homeClass}>
                            <i className="icon-home"/>Главная
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/legalEntities" className={legalEntitiesClass}>
                            <i className="fa fa-briefcase" aria-hidden="true"/>Компании (юридические лица)
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/organizations" className={organizationsClass}>
                            <i className="fa fa-building-o" aria-hidden="true"/>Объекты компаний
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/employees" className={employeesClass}>
                            <i className="fa fa-users" aria-hidden="true"/>Сотрудники компаний
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/hospitals" className={hospitalsClass}>
                            <i className="fa fa-stethoscope" aria-hidden="true"/>Медицинские центры
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/researches" className={researchesClass}>
                            <i className="fa fa-heartbeat" aria-hidden="true"/>Исследования
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <i className="fa fa-bar-chart" aria-hidden="true"/>Отчеты
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <i className="fa fa-handshake-o" aria-hidden="true"/>Партнеры
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={this.logout.bind(this)}>
                            <i className="fa fa-lock" aria-hidden="true"/>Выход
                        </NavLink>
                    </NavItem>
                </Nav>
                <button className="sidebar-minimizer brand-minimizer" type="button"/>
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{research: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        research: state.researches.research
    };
}

Sidebar.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Sidebar);

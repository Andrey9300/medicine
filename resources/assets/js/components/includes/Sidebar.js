import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {logoutUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Sidebar extends Component {
    logout(event) {
        event.preventDefault();
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav-item" id="main_nav">
                        <li>
                            <IndexLink to="/" className="nav-link">
                                <i className="icon-home"/>Главная
                            </IndexLink>
                        </li>
                        <li>
                            <Link to="legalEntities" className="nav-link">
                                <i className="fa fa-briefcase" aria-hidden="true"/>Компании (юридические лица)
                            </Link>
                        </li>
                        <li>
                            <Link to="organizations" className="nav-link">
                                <i className="fa fa-building-o" aria-hidden="true"/>Объекты компаний
                            </Link>
                        </li>
                        <li>
                            <Link to="employees" className="nav-link">
                                <i className="fa fa-users" aria-hidden="true"/>Сотрудники компаний
                            </Link>
                        </li>
                        <li>
                            <Link to="hospitals" className="nav-link">
                                <i className="fa fa-stethoscope" aria-hidden="true"/>Медицинские центры
                            </Link>
                        </li>
                        <li>
                            <Link to="researches" className="nav-link">
                                <i className="fa fa-heartbeat" aria-hidden="true"/>Исследования
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="nav-link">
                                <i className="fa fa-bar-chart" aria-hidden="true"/>Отчеты
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="nav-link">
                                <i className="fa fa-handshake-o" aria-hidden="true"/>Партнеры
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={this.logout.bind(this)} className="nav-link">
                                <i className="fa fa-lock" aria-hidden="true"/>Выход
                            </Link>
                        </li>
                    </ul>
                </nav>
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

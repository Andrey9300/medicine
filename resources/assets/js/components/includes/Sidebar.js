import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false
        };
    }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;

        this.setState({
            collapsed
        });
    }

    handleClick(event) {
        event.preventDefault();
        event.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName, props) {
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

    }

    render() {
        const {location} = this.props;
        const {collapsed} = this.state;
        const homeClass = location.pathname === '/' ? 'active' : 'nav-item';
        const hospitalsClass = location.pathname.match(/^\/hospitals/) ? 'active' : 'nav-item';
        const organizationsClass = location.pathname.match(/^\/organizations/) ? 'active' : 'nav-item';
        const researchesClass = location.pathname.match(/^\/researches/) ? 'active' : 'nav-item';
        const usersClass = location.pathname.match(/^\/users/) ? 'active' : 'nav-item';

        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav-item">
                        <li className={homeClass}>
                            <IndexLink to="/" onClick={this.toggleCollapse.bind(this)} className="nav-link">
                                <i className="icon-speedometer"></i>Главная
                            </IndexLink>
                        </li>
                        <li className={hospitalsClass}>
                            <Link to="hospitals" onClick={this.toggleCollapse.bind(this)} className="nav-link">
                                <i className="icon-speedometer"></i>Медицинские учреждения
                            </Link>
                        </li>
                        <li className={organizationsClass}>
                            <Link to="organizations" onClick={this.toggleCollapse.bind(this)} className="nav-link">
                                <i className="icon-speedometer"></i>Организации
                            </Link>
                        </li>
                        <li className={researchesClass}>
                            <Link to="researches" onClick={this.toggleCollapse.bind(this)} className="nav-link">
                                <i className="icon-speedometer"></i>Исследования
                            </Link>
                        </li>
                        <li className={usersClass}>
                            <Link to="users" onClick={this.toggleCollapse.bind(this)} className="nav-link">
                                <i className="icon-speedometer"></i>Сотрудники
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className="sidebar-minimizer brand-minimizer" type="button"></button>
            </div>
        );
    }
}

export default Sidebar;

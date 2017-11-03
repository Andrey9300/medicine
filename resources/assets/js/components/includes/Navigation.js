import {IndexLink, Link} from 'react-router';
import React from 'react';

export default class Navigation extends React.Component {

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

    render() {
        const {location} = this.props;
        const {collapsed} = this.state;
        const homeClass = location.pathname === '/' ? 'active' : 'nav-link';
        const hospitalsClass = location.pathname.match(/^\/hospitals/) ? 'active' : 'nav-link';
        const organizationsClass = location.pathname.match(/^\/organizations/) ? 'active' : 'nav-link';
        const researchesClass = location.pathname.match(/^\/researches/) ? 'active' : 'nav-link';
        const usersClass = location.pathname.match(/^\/users/) ? 'active' : '';

        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav-item">
                        <li className={homeClass}>
                            <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Главная</IndexLink>
                        </li>
                        <li className={hospitalsClass}>
                            <Link to="hospitals" onClick={this.toggleCollapse.bind(this)}>Медицинские учреждения</Link>
                        </li>
                        <li className={organizationsClass}>
                            <Link to="organizations" onClick={this.toggleCollapse.bind(this)}>Организации</Link>
                        </li>
                        <li className={researchesClass}>
                            <Link to="researches" onClick={this.toggleCollapse.bind(this)}>Исследования</Link>
                        </li>
                        <li className={usersClass}>
                            <Link to="users" onClick={this.toggleCollapse.bind(this)}>Сотрудники</Link>
                        </li>
                    </ul>
                </nav>
                <button className="sidebar-minimizer brand-minimizer" type="button"></button>
            </div>
        );
    }
}

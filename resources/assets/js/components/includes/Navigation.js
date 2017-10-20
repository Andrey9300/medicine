import {IndexLink, Link} from 'react-router';
import React from 'react';

export default class Navigation extends React.Component {

    constructor() {
        super();
        this.state = {
            collapsed: true
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
        const homeClass = location.pathname === '/' ? 'active' : '';
        const hospitalsClass = location.pathname.match(/^\/hospitals/) ? 'active' : '';
        const organizationsClass = location.pathname.match(/^\/organizations/) ? 'active' : '';
        const researchesClass = location.pathname.match(/^\/researches/) ? 'active' : '';
        const navClass = collapsed ? 'collapse' : '';

        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#/" className="navbar-brand">Навигация</a>
                        <button className="navbar-toggle" type="button" onClick={this.toggleCollapse.bind(this)}>
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className={`navbar-collapse ${navClass}`} id="navbar-main">
                        <ul className="nav navbar-nav">
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
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

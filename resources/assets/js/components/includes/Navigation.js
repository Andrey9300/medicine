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
        const usersClass = location.pathname.match(/^\/users/) ? 'active' : '';
        const articlesClass = location.pathname.match(/^\/articles/) ? 'active' : '';
        const organizationsClass = location.pathname.match(/^\/organizations/) ? 'active' : '';
        const navClass = collapsed ? 'collapse' : '';
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#/" className="navbar-brand">My React App</a>
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
                                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
                            </li>
                            <li className={usersClass}>
                                <Link to="users" onClick={this.toggleCollapse.bind(this)}>Users</Link>
                            </li>
                            <li className={articlesClass}>
                                <Link to="articles" onClick={this.toggleCollapse.bind(this)}>Articles</Link>
                            </li>
                            <li className={organizationsClass}>
                                <Link to="organizations" onClick={this.toggleCollapse.bind(this)}>Organizations</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

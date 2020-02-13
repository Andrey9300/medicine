import React from 'react';

import Header from '../components/includes/Header';
import Footer from '../components/includes/Footer';
import Sidebar from '../components/includes/Sidebar';
import PropTypes from 'prop-types';

import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'react-notifications/lib/notifications.css';
import {connect} from 'react-redux';
import {fetchUser} from '../actions/userActions';

class LayoutComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    render() {
        const {location, children} = this.props;

        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar location={location}/>
                    <main className="main">
                        {children}
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}

LayoutComponent.propTypes = {
    children: PropTypes.element
};

const mapStateToProps = (state) => {
    return {
        user: state.users.user
    };
};

export const Layout = connect(mapStateToProps)(LayoutComponent);

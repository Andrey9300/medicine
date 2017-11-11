import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth(this.props.users);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.users);
        }

        checkAuth(users) {
            if (!users.isAuthenticated) {
                this.props.dispatch({
                    payload: {
                        method: 'replace',
                        nextUrl: '/login'
                    },
                    type: 'ROUTING'
                });
            }
        }

        render() {
            return (
                <div>
                    {this.props.users.isAuthenticated === true
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            users: state.users
        };
    }

    AuthenticatedComponent.propTypes = {
        dispatch: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
}

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.PureComponent {
    componentDidMount() {
      this.checkAuth(this.props.users);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.users);
    }

    checkAuth(users) {
      if (!users || !users.isAuthenticated) {
        this.props.dispatch({
          payload: {
            method: 'replace',
            nextUrl: '/lmk/login',
          },
          type: 'ROUTING',
        });
      }
    }

    render() {
      return (
        <div>
          {this.props.users.isAuthenticated === true ? (
            <Component {...this.props} />
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      users: state.users,
    };
  };

  AuthenticatedComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}

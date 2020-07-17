import React from 'react';
import {connect} from 'react-redux';
import {
  clearEmployees,
  fetchEmployees,
} from '../../actions/lmk/employeeActions';
import {TState} from '../../reducers';

interface IStateProps {
  users: any;
}

interface IDispatchProps {
  clearEmployees: typeof clearEmployees;
  fetchEmployees: typeof fetchEmployees;
}

interface IProps extends IStateProps, IDispatchProps {}

export default function requireAuthentication(Component: any) {
  class AuthenticatedComponent extends React.PureComponent<IProps> {
    componentDidMount() {
      this.checkAuth(this.props.users);
    }

    componentWillReceiveProps(nextProps: IProps) {
      this.checkAuth(nextProps.users);
    }

    checkAuth(users: any) {
      if (!users || !users.isAuthenticated) {
        // this.props.dispatch({
        //   payload: {
        //     method: 'replace',
        //     nextUrl: '/services/login',
        //   },
        //   type: 'ROUTING',
        // });
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

  const mapStateToProps = (state: TState) => {
    return {
      users: state.users,
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}

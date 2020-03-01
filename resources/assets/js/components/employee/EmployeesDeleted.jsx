import {fetchEmployees} from '../../actions/employeeActions';
import {EmployeesList} from './EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';

class EmployeesDeleted extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchEmployees());
  }

  render() {
    const {user, deleted, fetched, errors} = this.props;
    const status = {
      fetched,
      errors,
    };

    if (!deleted) {
      return null;
    }

    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <EmployeesList
                employees={deleted}
                user={user}
                title={'Сотрудники в архиве '}
                status={status}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

EmployeesDeleted.propTypes = {
  dispatch: PropTypes.func.isRequired,
  deleted: PropTypes.array.isRequired,
  user: PropTypes.object,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    organization: state.organizations.organization,
    deleted: state.employees.deleted,
    fetched: state.employees.fetched,
    errors: state.employees.errors,
  };
};

export default connect(mapStateToProps)(EmployeesDeleted);

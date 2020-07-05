import {clearEmployees, fetchEmployees, fetchEmployeesWithCheck} from '../../actions/lmk/employeeActions';
import {EmployeesList} from './EmployeesList';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';

class EmployeesDeleted extends React.PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(clearEmployees());
    dispatch(fetchEmployees());
  }

  render() {
    const {deleted, fetched, errors} = this.props;
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
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    organization: state.organizations.organization,
    deleted: state.employees.deleted,
    fetched: state.employees.fetched,
    errors: state.employees.errors,
  };
};

export default connect(mapStateToProps)(EmployeesDeleted);

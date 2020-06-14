import {
  clearEmployees,
  fetchEmployees,
} from '../../actions/employeeActions';
import {EmployeesList} from './EmployeesList';
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader} from 'reactstrap';

class Employees extends React.PureComponent {
  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(clearEmployees());
    dispatch(fetchEmployees());
  }

  render() {
    const {employees, fetched} = this.props;

    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <EmployeesList
                employees={employees}
                title={'Сотрудники '}
                status={{fetched, fetchedWithCheck: false}}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <Link to={'/lmk/employeesDeleted'}>Сотрудники в архиве</Link>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Employees.propTypes = {
  dispatch: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  fetched: PropTypes.bool,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    employees: state.employees.employees,
    organization: state.organizations.organization,
    fetched: state.employees.fetched,
    errors: state.employees.errors,
  };
};

export default connect(mapStateToProps)(Employees);

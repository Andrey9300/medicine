import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader} from 'reactstrap';

import {clearEmployees, fetchEmployees} from '../../actions/employeeActions';
import {EmployeesList} from './EmployeesList';

interface IStateProps {
  employees: [];
  fetched: boolean;
}

interface IDispatchProps {
  clearEmployees: typeof clearEmployees;
  fetchEmployees: typeof fetchEmployees;
}

interface IProps extends IStateProps, IDispatchProps {}

class EmployeesComponent extends React.PureComponent<IProps> {
  componentDidMount() {
    const {clearEmployees, fetchEmployees} = this.props;

    clearEmployees();
    fetchEmployees();
  }

  render() {
    const {employees, fetched} = this.props;

    return (
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
    );
  }
}

const mapStateToProps = (state: any): IStateProps => {
  return {
    employees: state.employees.employees,
    fetched: state.employees.fetched,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearEmployees: () => dispatch(clearEmployees()),
    fetchEmployees: () => dispatch(fetchEmployees()),
  };
};

export const Employees = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesComponent);

import React from 'react';
import {connect} from 'react-redux';
import {
  fetchEmployee,
  deleteEmployee,
  restoreEmployee,
  clearEmployee,
} from '../../../actions/lmk/employeeActions';
import {EmployeeResearches} from './research/EmployeeResearches';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table, Button} from 'reactstrap';
import {IEmployee} from '../../../interface/lmk/IEmployee';
import {TState} from '../../../reducers';
import {IUser} from '../../../interface/IUser';

interface IStateProps {
  user: IUser;
  employee: IEmployee;
}

interface IDispatchProps {
  clearEmployee: typeof clearEmployee;
  fetchEmployee: typeof fetchEmployee;
  restoreEmployee: typeof restoreEmployee;
  deleteEmployee: typeof deleteEmployee;
}

interface IProps extends IStateProps, IDispatchProps {
  match: any;
}

interface IState {
  employeeId: number;
}

class Employee extends React.PureComponent<IProps, IState> {
  state: IState = {
    employeeId: null,
  };

  componentDidMount() {
    const {match, clearEmployee, fetchEmployee} = this.props;
    const employeeId = match.params.id;

    clearEmployee();
    fetchEmployee(employeeId);
  }

  handleBtnDelete = (id: number, event: any) => {
    const {deleteEmployee, employee} = this.props;
    event.preventDefault();

    deleteEmployee(id, employee.organization.id);
  };

  restoreEmployee(id: number, event: any) {
    const {restoreEmployee} = this.props;
    event.preventDefault();
    restoreEmployee(id);
  }

  render() {
    const {employee} = this.props;
    const {employeeId} = this.state;
    let errorsMessage = '';

    if (!employee) {
      return null;
    }

    return (
      <>
        {errorsMessage}
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" md="12" lg="8">
              <Card>
                <CardHeader>
                  <i className="fa fa-users" aria-hidden="true" />
                  {employee.fio}
                  {employee.deleted_at && (
                    <Button
                      className="pull-right"
                      type="submit"
                      size="sm"
                      color="secondary"
                      onClick={(event) =>
                        this.restoreEmployee(employee.id, event)
                      }
                    >
                      Восстановить
                    </Button>
                  )}
                  {!employee.deleted_at && (
                    <>
                      <Link
                        to={`/services/lmk/employees/edit/${employee.id}`}
                        style={{
                          marginLeft: '12px',
                        }}
                      >
                        <i className="fa fa-pencil" />
                      </Link>

                      <Button
                        className="pull-right"
                        type="submit"
                        size="sm"
                        color="danger"
                        onClick={(event) =>
                          this.handleBtnDelete(employee.id, event)
                        }
                      >
                        В архив
                      </Button>
                    </>
                  )}
                </CardHeader>
                <CardBody className="card-body">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>Объект:</td>
                        <td>
                          {employee.organization_name
                            ? employee.organization_name
                            : 'Не привязан'}
                        </td>
                      </tr>
                      <tr>
                        <td>Дата рождения:</td>
                        <td>{employee.date_birthday}</td>
                      </tr>
                      <tr>
                        <td>Дата устройства на работу:</td>
                        <td>{employee.date_employment}</td>
                      </tr>
                      <tr>
                        <td>Номер мед книжки:</td>
                        <td>{employee.medical_book}</td>
                      </tr>
                      {employee.deleted_at && (
                        <tr>
                          <td>В архиве с:</td>
                          <td>{employee.deleted_at}</td>
                        </tr>
                      )}
                      <tr>
                        <td>Отдел:</td>
                        <td>{employee.department}</td>
                      </tr>
                      <tr>
                        <td>Должность:</td>
                        <td>{employee.position}</td>
                      </tr>
                      <tr>
                        <td>Категория:</td>
                        <td>{employee.category.name}</td>
                      </tr>
                      <tr>
                        <td>Комментарий:</td>
                        <td>{employee.comments}</td>
                      </tr>
                      <tr>
                        <td>Отправлен на МО:</td>
                        <td>
                          {employee.send_to_research
                            ? employee.send_to_research
                            : 'Не отправлен'}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <EmployeeResearches idEmployee={employeeId} />
      </>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    employee: state.employees.employee,
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearEmployee: () => dispatch(clearEmployee()),
    fetchEmployee: (id: number) => dispatch(fetchEmployee(id)),
    restoreEmployee: (id: number) => dispatch(restoreEmployee(id)),
    deleteEmployee: (id: number, organizationId: number) =>
      dispatch(deleteEmployee(id, organizationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

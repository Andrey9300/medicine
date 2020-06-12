import React from 'react';
import {connect} from 'react-redux';
import {fetchEmployee, deleteEmployee, restoreEmployee, clearEmployee} from './../../actions/employeeActions';
import EmployeeResearches from './research/EmployeeResearches';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table, Button} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

class Employee extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      employeeId: props.match.params.id,
      errors: null,
    };
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(clearEmployee());
    dispatch(fetchEmployee(this.state.employeeId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(
      deleteEmployee(id, this.props.employee.organization.id),
    );
  }

  restoreEmployee(id, event) {
    event.preventDefault();
    this.props.dispatch(
      restoreEmployee(id),
    );
  }

  render() {
    const {employee} = this.props;
    const {errors, employeeId} = this.state;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

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
                  {employee.deleted_at &&
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
                  }
                  {!employee.deleted_at && (
                    <>
                      <Link
                        to={`/lmk/employees/edit/${employee.id}`}
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
                        <td>{employee.send_to_research ? employee.send_to_research : 'Не отправлен'}</td>
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

Employee.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object,
  employee: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    employee: state.employees.employee,
    user: state.users.user,
  };
};

export default connect(mapStateToProps)(Employee);

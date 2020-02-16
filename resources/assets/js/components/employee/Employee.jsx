import React from 'react';
import {connect} from 'react-redux';
import {fetchEmployee, deleteEmployee} from './../../actions/employeeActions';
import EmployeeResearches from './research/EmployeeResearches';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table, Button} from 'reactstrap';

class Employee extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      employeeId: props.match.params.id,
      errors: null
    };
    this.handleBtnDelete = this.handleBtnDelete.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchEmployee(this.state.employeeId));
  }

  handleBtnDelete(id, event) {
    event.preventDefault();
    this.props.dispatch(deleteEmployee(
      id,
      this.props.employee.organization.id
    ));
  }

  createMarkup() {
    const {errors} = this.state;

    return Object.keys(errors).map((item) => {
      return errors[item].map((value, index) => {
        return <p key={index}>{value}</p>;
      });
    });
  }

  render() {
    const {employee} = this.props;
    const {errors, employeeId} = this.state;
    let errorsMessage = '';

    if (errors) {
      errorsMessage = <div className="alert alert-danger" role="alert">{this.createMarkup()}</div>;
    }

    if (!employee) {
      return null;
    }

    return (
      <>
        {errorsMessage}
        <div className="animated fadeIn">
          <Row>
            <Col xs="6" sm="6" md="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-users" aria-hidden="true"/>
                  {employee.fio}
                  {!employee.deleted_at &&
                    <>
                      <Link to={`/employees/edit/${employee.id}`} style={{
                        marginLeft: '12px'
                      }}>
                        <i className="fa fa-pencil"/>
                      </Link>

                      <span className="pull-right" onClick={(event) => this.handleBtnDelete(
                        employee.id,
                        event
                      )}>
                        <Button type="submit" size="sm" color="danger">Уволить</Button>
                      </span>
                    </>
                  }
                </CardHeader>
                <CardBlock className="card-body">
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td>Объект:</td>
                        <td>{employee.organization_name ? employee.organization_name : 'Не привязан'}</td>
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
                      <tr>
                        <td>Уволен:</td>
                        <td>{employee.deleted_at ? employee.deleted_at : 'Нет'}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </div>
        <EmployeeResearches
          idEmployee={employeeId}
        />
      </>
    );
  }
}

Employee.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object,
  employee: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    employee: state.employees.employee,
    user: state.users.user
  };
};

export default connect(mapStateToProps)(Employee);

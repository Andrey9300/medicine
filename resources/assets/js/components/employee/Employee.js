import React from 'react';
import {connect} from 'react-redux';
import {fetchEmployee, deleteEmployee} from './../../actions/employeeActions';
import EmployeeResearches from './research/EmployeeResearches';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: props.params.id,
            errors: ''
        };
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployee(this.state.employeeId));
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteEmployee(id, this.props.employee.organization.id));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {employee} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (employee !== null) {
            formElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <Card>
                                <CardHeader>
                                    {employee.fio}
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td>Организация: </td>
                                                <td>
                                                    {(() => {
                                                        if (employee.organization_name) {
                                                            return employee.organization_name;
                                                        }

                                                        return 'Не привязан';
                                                    })()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Дата рождения: </td>
                                                <td>{employee.date_birthday}</td>
                                            </tr>
                                            <tr>
                                                <td>Дата устройства на работу: </td>
                                                <td>{employee.date_employment}</td>
                                            </tr>
                                            <tr>
                                                <td>Номер мед книжки: </td>
                                                <td>{employee.medical_book}</td>
                                            </tr>
                                            <tr>
                                                <td>Уволен: </td>
                                                <td>
                                                    {(() => {
                                                        if (employee.deleted_at) {
                                                            return employee.deleted_at;
                                                        }

                                                        return 'Нет';
                                                    })()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Link to={`employees/edit/${employee.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${employee.id}`} className="pull-left">
                                                        <input type="hidden" name="employee_id" value={employee.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(employee.id, event)}
                                                           href="#" id={employee.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"/>
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                </div>;
        }

        return (
            <div>
                {errors}
                {formElements}
                <EmployeeResearches
                    idEmployee={this.state.employeeId}
                />
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{employee: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        employee: state.employees.employee
    };
}

Employee.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Employee);

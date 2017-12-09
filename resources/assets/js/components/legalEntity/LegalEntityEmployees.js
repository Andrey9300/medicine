import {deleteEmployee, forceDeleteEmployee, fetchEmployees} from '../../actions/employeeActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class LegalEntityEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            legalEntityId: props.params.legalEntityId
        };
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployees(this.state.legalEntityId));
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteEmployee(id));
    }

    handleBtnForceDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(forceDeleteEmployee(id));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-users" aria-hidden="true"/>Сотрудники
                                ({this.props.employees.length})
                                <Link to="employees/create" className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Организация</th>
                                        <th>Редактировать</th>
                                        <th>Уволить</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.employees.map((employee) => {
                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <Link to={`employees/${employee.id}`}>
                                                        {employee.fio}
                                                    </Link>
                                                </td>
                                                <td>{employee.organization_name}</td>
                                                <td>
                                                    <Link to={`employees/edit/${employee.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${employee.id}`} className="pull-left"
                                                          method="post">
                                                        <input type="hidden" name="employee_id" value={employee.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(employee.id, event)}
                                                           href="#" id={employee.id}>Уволить
                                                            <i className="glyphicon glyphicon-trash"/>
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-employees" aria-hidden="true"/>Уволенные Сотрудники
                                ({this.props.deleted.length})
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Организация</th>
                                        <th>Редактировать</th>
                                        <th>Удалить</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.deleted.map((employee) => {
                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <Link to={`employees/${employee.id}`}>
                                                        {employee.fio}
                                                    </Link>
                                                </td>
                                                <td>{employee.organization_name}</td>
                                                <td>
                                                    <Link to={`employees/edit/${employee.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${employee.id}`} className="pull-left"
                                                          method="post">
                                                        <input type="hidden" name="employee_id" value={employee.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnForceDelete(employee.id, event)}
                                                           href="#" id={employee.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"/>
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-employees" aria-hidden="true"/>Сотрудники без организации
                                ({this.props.withoutOrganization.length})
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Организация</th>
                                        <th>Редактировать</th>
                                        <th>Удалить</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.withoutOrganization.map((employee) => {
                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <Link to={`employees/${employee.id}`}>
                                                        {employee.fio}
                                                    </Link>
                                                </td>
                                                <td>{employee.organization_name}</td>
                                                <td>
                                                    <Link to={`employees/edit/${employee.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${employee.id}`} className="pull-left"
                                                          method="post">
                                                        <input type="hidden" name="employee_id" value={employee.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnForceDelete(employee.id, event)}
                                                           href="#" id={employee.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"/>
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

LegalEntityEmployees.propTypes = {
    dispatch: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
    deleted: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        employees: state.employees.employees,
        deleted: state.employees.deleted,
        withoutOrganization: state.employees.withoutOrganization
    };
};

export default connect(mapStateToProps)(LegalEntityEmployees);

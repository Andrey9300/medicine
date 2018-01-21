import {deleteEmployee, forceDeleteEmployee, fetchEmployees} from '../../actions/employeeActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, CardFooter, Table, Button} from 'reactstrap';

class Employees extends React.Component {
    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployees());
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
        const {user} = this.props;
        let addButton = null;

        if (user && user.role === 'admin') {
            addButton =
                <Link to="employees/create" className="btn btn-primary btn-sm pull-right">
                    Добавить <i className="icon-plus"/>
                </Link>;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-users" aria-hidden="true"/>Сотрудники
                                ({this.props.employees.length})
                                {addButton}
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Объект</th>
                                        <th>Статус МО</th>
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
                                                    {(() => {
                                                        let text = '';
                                                        let classSpan = '';

                                                        if (employee.researches_expired) {
                                                            text = 'Просрочено';
                                                            classSpan = 'badge badge-danger';
                                                        } else if (employee.researches_ended) {
                                                            text = 'Заканчивается';
                                                            classSpan = 'badge badge-warning';
                                                        }

                                                        return (
                                                            <span className={classSpan}>
                                                                    {text}
                                                                </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td>
                                                    <Button type="submit" size="sm" color="danger"
                                                            onClick={
                                                                (event) => this.handleBtnDelete(employee.id, event)
                                                            }
                                                    >
                                                        Уволить
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </CardBlock>
                            <CardFooter>
                                {addButton}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" lg="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-users" aria-hidden="true"/>Уволенные Сотрудники
                                ({this.props.deleted.length})
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Объект</th>
                                        <th>Статус МО</th>
                                        {user && user.role === 'admin' ? <th>Удалить</th> : null}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.deleted.map((employee) => {
                                        let tdLinkDelete = null;

                                        if (user && user.role === 'admin') {
                                            tdLinkDelete =
                                                <td>
                                                    <Button type="submit" size="sm" color="danger"
                                                            onClick={
                                                                (event) => this.handleBtnForceDelete(employee.id, event)
                                                            }
                                                    >
                                                        Удалить
                                                    </Button>
                                                </td>;
                                        }

                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <Link to={`employees/${employee.id}`}>
                                                        {employee.fio}
                                                    </Link>
                                                </td>
                                                <td>{employee.organization_name}</td>
                                                <td>
                                                    {(() => {
                                                        let text = '';
                                                        let classSpan = '';

                                                        if (employee.researches_expired) {
                                                            text = 'Просрочено';
                                                            classSpan = 'badge badge-danger';
                                                        } else if (employee.researches_ended) {
                                                            text = 'Заканчивается';
                                                            classSpan = 'badge badge-warning';
                                                        }

                                                        return (
                                                            <span className={classSpan}>
                                                                    {text}
                                                                </span>
                                                        );
                                                    })()}
                                                </td>
                                                {tdLinkDelete}
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </CardBlock>
                        </Card>
                    </Col>
                    <Col xs="6" lg="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-users" aria-hidden="true"/>Сотрудники без организации
                                ({this.props.withoutOrganization.length})
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Статус МО</th>
                                        {user && user.role === 'admin' ? <th>Удалить</th> : null}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.withoutOrganization.map((employee) => {
                                        let tdLinkDelete = null;

                                        if (user && user.role === 'admin') {
                                            tdLinkDelete =
                                                <td>
                                                    <Button type="submit" size="sm" color="danger"
                                                            onClick={
                                                                (event) => this.handleBtnForceDelete(employee.id, event)
                                                            }
                                                    >
                                                        Удалить
                                                    </Button>
                                                </td>;
                                        }

                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <Link to={`employees/${employee.id}`}>
                                                        {employee.fio}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {(() => {
                                                        let text = '';
                                                        let classSpan = '';

                                                        if (employee.researches_expired) {
                                                            text = 'Просрочено';
                                                            classSpan = 'badge badge-danger';
                                                        } else if (employee.researches_ended) {
                                                            text = 'Заканчивается';
                                                            classSpan = 'badge badge-warning';
                                                        }

                                                        return (
                                                            <span className={classSpan}>
                                                                    {text}
                                                                </span>
                                                        );
                                                    })()}
                                                </td>
                                                {tdLinkDelete}
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

Employees.propTypes = {
    dispatch: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
    deleted: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        employees: state.employees.employees,
        deleted: state.employees.deleted,
        withoutOrganization: state.employees.withoutOrganization
    };
};

export default connect(mapStateToProps)(Employees);

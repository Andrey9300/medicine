import React from 'react';
import {connect} from 'react-redux';
import {fetchEmployee, deleteEmployee} from './../../actions/employeeActions';
import EmployeeResearches from './research/EmployeeResearches';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

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
        const {user, employee} = this.props;
        let errors = '';
        let linkEdit = null;
        let buttonDelete = null;

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (!employee) {
            return null;
        }

        if (user && user.role === 'admin') {
            linkEdit =
                <Link to={`employees/edit/${employee.id}`} style={{marginLeft: '18px'}}>
                    <i className="fa fa-pencil"/>
                </Link>;
            buttonDelete =
                <span className="pull-right" onClick={(event) => this.handleBtnDelete(employee.id, event)}>
                    <i className="fa fa-trash"/> Уволить
                </span>;
        }


        return (
            <div>
                {errors}
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="6" sm="6" md="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-users" aria-hidden="true"/>
                                    {employee.fio}
                                    {linkEdit}
                                    {buttonDelete}
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                        <tr>
                                            <td>Объект: </td>
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
                                        </tbody>
                                    </Table>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <EmployeeResearches
                    idEmployee={this.state.employeeId}
                />
            </div>
        );
    }
}

Employee.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
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

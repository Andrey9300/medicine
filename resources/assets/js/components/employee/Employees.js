import {deleteEmployee, fetchEmployees} from '../../actions/employeeActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table
} from 'reactstrap';
import PropTypes from 'prop-types';

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

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-employees" aria-hidden="true"/>Сотрудники
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
                                        <th>Удалить</th>
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
                                                    <form id={`form_${employee.id}`} className="pull-left" method="post">
                                                        <input type="hidden" name="employee_id" value={employee.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(employee.id, event)}
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

/**
 * Map
 * @param state
 * @returns {{employees: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        employees: state.employees.employees
    };
}

Employees.propTypes = {
    dispatch: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Employees);

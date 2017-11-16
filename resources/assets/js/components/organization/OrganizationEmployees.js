import {fetchOrganizationEmployees, deleteOrganizationEmployee} from '../../actions/organizationActions';
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

class OrganizationEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            organizationId: props.params.idOrganization
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganizationEmployees(this.state.organizationId));
    }

    handleBtnDelete(idEmployee, event) {
        event.preventDefault();
        this.props.dispatch(deleteOrganizationEmployee(this.state.organizationId, idEmployee));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/>Сотрудники
                                <Link to={`organizations/employees/create/${this.state.organizationId}`} className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        {/*<th>Исследования</th>*/}
                                        <th>Редактировать</th>
                                        <th>Удалить</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.organizationEmployees.map((employee) => {
                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <Link to={`employees/${employee.id}`}>
                                                        {employee.fio}
                                                    </Link>
                                                </td>
                                                {/*<td>
                                                    <Link to={`employees/researches/${employee.id}`}
                                                          className="btn btn-primary btn-xs pull-left">Исследования
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>*/}
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
 * @returns {{researchesEmployee: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        organizationEmployees: state.organizations.organizationEmployees
    };
}

OrganizationEmployee.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(OrganizationEmployee);

import React from 'react';
import {connect} from 'react-redux';
import {fetchCommonInfo} from './../../actions/legalEntityActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';

class LegalEntityEndsEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            legalEntityId: props.params.legalEntityId
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchCommonInfo(this.state.legalEntityId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {legalEntity} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (legalEntity !== null) {
            formElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-users" aria-hidden="true"/>Сотрудники
                                    ({this.props.employeesResearchesEnds.length})
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
                                        { this.props.employeesResearchesEnds.map((employee) => {
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
                </div>;
        }

        return (
            <div>
                {errors}
                {formElements}
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{legalEntity: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        user: state.legalEntities.legalEntityCommonInfo.user,
        legalEntity: state.legalEntities.legalEntityCommonInfo.legalEntity,
        organizations: state.legalEntities.legalEntityCommonInfo.organizations,
        countOrganizationsWithResearchProblems: state.legalEntities.legalEntityCommonInfo.countOrganizationsWithResearchProblems,
        hospitals: state.legalEntities.legalEntityCommonInfo.hospitals,
        employees: state.legalEntities.legalEntityCommonInfo.employees,
        employeesResearchesEnds: state.legalEntities.legalEntityCommonInfo.employeesResearchesEnds,
        employeesResearchesExpired: state.legalEntities.legalEntityCommonInfo.employeesResearchesExpired
    };
}

LegalEntityEndsEmployees.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LegalEntityEndsEmployees);
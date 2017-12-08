import React from 'react';
import {connect} from 'react-redux';
import {fetchCommonInfo, fetchLegalEntity, deleteLegalEntity} from './../../actions/legalEntityActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';

class LegalEntity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            legalEntityId: props.params.id
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchCommonInfo(this.state.legalEntityId));
    }

    handleBtnDelete(legalEntityId, event) {
        event.preventDefault();
        this.props.dispatch(deleteLegalEntity(legalEntityId));
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
                        <Col xs="4" sm="4" md="4">
                            <Card>
                                <CardHeader>
                                    «{legalEntity.name}»
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td>Адрес: </td>
                                                <td>{legalEntity.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Телефон: </td>
                                                <td>{legalEntity.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Инн: </td>
                                                <td>{legalEntity.inn}</td>
                                            </tr>
                                            <tr>
                                                <td>Администратор: </td>
                                                <td>{this.props.user.fio}</td>
                                            </tr>
                                            <tr>
                                                <td>E-mail администратора: </td>
                                                <td>{this.props.user.email}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Link to={`legalEntities/edit/${legalEntity.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${legalEntity.id}`}
                                                          className="pull-left" method="post">
                                                        <input type="hidden" name="legalEntity_id"
                                                               value={legalEntity.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(e) => this.handleBtnDelete(legalEntity.id, e)}
                                                           href="#" id={legalEntity.id}>Удалить
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
                        <Col xs="4" sm="4" md="4">
                            <Card>
                                <CardHeader>
                                    Медицинские исследования проводит:
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                            { this.props.hospitals.map((hospital) => {
                                                return (
                                                    <tr key={hospital.id}>
                                                        <td>
                                                            <Link to={`hospitals/${hospital.id}`}>
                                                                {hospital.name}
                                                            </Link>
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
                        <Col xs="4" sm="4" md="4">
                            <Card>
                                <CardHeader>
                                    Общая информация об объектах:
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                        <tr>
                                            <td>В компании зарегистрировано:</td>
                                            <td>
                                                <Link to={`legalEntities/organizations/${this.state.legalEntityId}`}>
                                                    {Object.values(this.props.organizations).length} объектов(а).
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Нарушен график прохождения медицинского осмотра:</td>
                                            <td>
                                                <Link to={`legalEntities/expiredOrganizations/${this.state.legalEntityId}`}>
                                                    {this.props.countOrganizationsWithResearchProblems} объектов(а).
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>

                                </CardBlock>
                            </Card>
                        </Col>
                        <Col xs="4" sm="4" md="4">
                            <Card>
                                <CardHeader>
                                    Общая информация по сотрудникам
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                        <tr>
                                            <td>Вы контролируете медицинские осмотры:</td>
                                            <td>
                                                <Link to={`legalEntities/employees/${this.state.legalEntityId}`}>
                                                    {this.props.employees.length} чел.
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Просрочен медицинский осмотр:</td>
                                            <td>
                                                <Link to={`legalEntities/expiredEmployees/${this.state.legalEntityId}`}>
                                                    {this.props.employeesResearchesExpired.length} чел.
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>В следующем месяца нужно направить на
                                                медицинский осмотр:</td>
                                            <td>
                                                <Link to={`legalEntities/endsEmployees/${this.state.legalEntityId}`}>
                                                    {this.props.employeesResearchesEnds.length} чел.
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4" sm="4" md="4">
                            <Card>
                                <CardHeader>
                                    Общая информация
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Link to={`legalEntities/edit/${legalEntity.id}`}>
                                        Справочная информация
                                    </Link>
                                    о медицинском осмотре и правилах оформления личной медицинской
                                    книжки
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

LegalEntity.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LegalEntity);

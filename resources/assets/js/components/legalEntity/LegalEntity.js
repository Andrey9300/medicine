import React from 'react';
import {connect} from 'react-redux';
import {fetchCommonInfo, deleteLegalEntity} from './../../actions/legalEntityActions';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

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
                        <Col xs="6" sm="6" md="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-briefcase" aria-hidden="true"/>«{legalEntity.name}»
                                    <Link to={`legalEntities/edit/${legalEntity.id}`}
                                          style={{marginLeft: '18px'}}
                                    >
                                        <i className="fa fa-pencil"/>
                                    </Link>
                                    <span className="pull-right"
                                          onClick={(event) => this.handleBtnDelete(legalEntity.id, event)}>
                                        <i className="fa fa-trash"/>
                                    </span>
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
                                                <td>Сайт: </td>
                                                <td>{legalEntity.site}</td>
                                            </tr>
                                            <tr>
                                                <td>ИНН: </td>
                                                <td>{legalEntity.inn}</td>
                                            </tr>
                                            <tr>
                                                <td>Администратор: </td>
                                                <td>{this.props.user.fio}</td>
                                            </tr>
                                            <tr>
                                                <td>E-mail: </td>
                                                <td>{this.props.user.email}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBlock>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-money" aria-hidden="true"/>
                                    Бюджет
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                        <tr>
                                            <td>
                                                Плановый бюджет МО в 2017 году составляет (с учетом указанных
                                                цен в мед учреждении)
                                            </td>
                                            <td>
                                                <Link>
                                                    111&nbsp;
                                                    <i className="fa fa-rub" aria-hidden="true"/>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>В прошлом месяце израсходовано</td>
                                            <td>
                                                <Link>
                                                    111&nbsp;
                                                    <i className="fa fa-rub" aria-hidden="true"/>
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </CardBlock>
                            </Card>
                        </Col>
                        <Col xs="6" sm="6" md="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-building-o" aria-hidden="true"/>
                                    Объекты
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
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-users" aria-hidden="true"/>
                                    Сотрудники
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
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-stethoscope" aria-hidden="true"/>
                                    Медицинские центры
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
                        <Col xs="6" sm="6" md="6">
                        </Col>
                        <Col xs="6" sm="6" md="6">

                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" sm="6" md="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-info" aria-hidden="true"/>
                                    Информация
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

LegalEntity.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
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
};

export default connect(mapStateToProps)(LegalEntity);

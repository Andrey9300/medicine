import React from 'react';
import {connect} from 'react-redux';
import {fetchOrganization, deleteOrganization} from './../../actions/organizationActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';
import {fetchHospitals} from '../../actions/hospitalActions';
// import OrganizationEmployees from './employee/OrganizationEmployees'; TODO через компонент

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            organizationId: props.params.id
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganization(this.state.organizationId));
        this.props.dispatch(fetchHospitals());
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteOrganization(id));
    }

    render() {
        const {organization} = this.props;
        let errors = '';
        let cardElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (organization !== null) {
            const researchesEnds = organization.employees.reduce((previousValue, employee) => {
                if (employee.researches_ends.length) {
                    return parseInt(previousValue, 10) + 1;
                }

                return parseInt(previousValue, 10);
            }, 0);

            const researchesExpired = organization.employees.reduce((previousValue, employee) => {
                if (employee.researches_expired.length) {
                    return parseInt(previousValue, 10) + 1;
                }

                return parseInt(previousValue, 10);
            }, 0);

            cardElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="6" sm="6" md="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-building-o" aria-hidden="true"/>«{organization.name}»
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                        <tr>
                                            <td>Регион:</td>
                                            <td>{organization.region.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Адрес:</td>
                                            <td>{organization.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Юридическое лицо:</td>
                                            <td>«{organization.legal_entity.name}»</td>
                                        </tr>
                                        <tr>
                                            <td>Телефон:</td>
                                            <td>{organization.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Руководитель:</td>
                                            <td>{organization.head_fio}</td>
                                        </tr>
                                        <tr>
                                            <td>E-mail руководителя: </td>
                                            <td>{organization.head_email}</td>
                                        </tr>
                                        <tr>
                                            <td>Категория:</td>
                                            <td>{organization.category.name}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to={`organizations/edit/${organization.id}`}
                                                      className="btn btn-success btn-xs pull-left">Редактировать
                                                </Link>
                                            </td>
                                            <td>
                                                <form id={`form_${organization.id}`}
                                                      className="pull-left"
                                                      method="post">
                                                    <input type="hidden"
                                                           name="organization_id"
                                                           value={organization.id} />
                                                    <a className="btn btn-danger btn-xs"
                                                       onClick={(event) => this.handleBtnDelete(organization.id, event)}
                                                       href="#" id={organization.id}>Удалить
                                                    </a>
                                                </form>
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
                                                <Link to={`legalEntities/endsEmployees/${this.state.legalEntityId}`}>
                                                    {organization.totalSumForResearches}&nbsp;
                                                    <i className="fa fa-rub" aria-hidden="true"/>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>В прошлом месяце израсходовано</td>
                                            <td>
                                                <Link to={`legalEntities/endsEmployees/${this.state.legalEntityId}`}>
                                                    {organization.totalSumForCompletedResearches}&nbsp;
                                                    <i className="fa fa-rub" aria-hidden="true"/>
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </CardBlock>
                            </Card>
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
                        <Col xs="6" sm="6" md="6">
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
                                                    {organization.employees.length} чел.
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Просрочен медицинский осмотр:</td>
                                            <td>
                                                <Link to={`legalEntities/expiredEmployees/${this.state.legalEntityId}`}>
                                                    {researchesExpired} чел.
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>В следующем месяца нужно направить на
                                                медицинский осмотр:</td>
                                            <td>
                                                <Link to={`legalEntities/endsEmployees/${this.state.legalEntityId}`}>
                                                    {researchesEnds} чел.
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
                                    Общая информация
                                </CardHeader>
                                <CardBlock className="card-body">
                                    Справочная информация о медицинском осмотре и правилах оформления личной медицинской
                                    книжки
                                </CardBlock>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" sm="6" md="6">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-users" aria-hidden="true"/>Сотрудники
                                    ({organization.employees.length})
                                    <Link to={`organizations/employees/create/${this.state.organizationId}`}
                                          className="btn btn-primary btn-sm pull-right">
                                        Добавить <i className="icon-plus"/>
                                    </Link>
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>ФИО</th>
                                            <th>Статус МО</th>
                                            <th>Сформировать направление</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { organization.employees.map((employee) => {
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

                                                            if (employee.researches_expired.length) {
                                                                text = 'Просрочено';
                                                                classSpan = 'badge badge-danger';
                                                            } else if (employee.researches_ends.length) {
                                                                text = 'Заканчивается';
                                                                classSpan = 'badge badge-warning';
                                                            } else {
                                                                text = 'Пройден';
                                                                classSpan = 'badge badge-success';
                                                            }

                                                            return (
                                                                <span className={classSpan}>
                                                                    {text}
                                                                </span>
                                                            );
                                                        })()}
                                                    </td>
                                                    <td>
                                                        {(() => {
                                                            if (employee.researches_ends.length ||
                                                                employee.researches_expired.length
                                                            ) {
                                                                return (
                                                                    <Link to={`employees/print/${employee.id}`}
                                                                          className="btn btn-secondary btn-sm pull-left">
                                                                        Направление
                                                                    </Link>
                                                                );
                                                            }

                                                            return '';
                                                        })()}
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
                {cardElements}
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{organization: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        organization: state.organizations.organization,
        hospitals: state.hospitals.hospitals
    };
}

Organization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Organization);

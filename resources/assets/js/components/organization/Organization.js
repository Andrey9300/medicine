import React from 'react';
import {connect} from 'react-redux';
import {fetchOrganization, deleteOrganization} from './../../actions/organizationActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';

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
            cardElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="12" md="12">
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
                                            <td>Адрес:</td>
                                            <td>{organization.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Юридическое лицо:</td>
                                            <td>«{organization.legal_entity.name}»</td>
                                            <td>Телефон:</td>
                                            <td>{organization.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Руководитель:</td>
                                            <td>{organization.head_fio}</td>
                                            <td>E-mail руководителя: </td>
                                            <td>{organization.head_email}</td>
                                        </tr>
                                        <tr>
                                            <td>Категория:</td>
                                            <td>{organization.category.name}</td>
                                            <td/>
                                            <td/>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to={`organizations/edit/${organization.id}`}
                                                      className="btn btn-success btn-xs pull-left">Редактировать
                                                    <i className="glyphicon glyphicon-pencil"/>
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
                                                        <i className="glyphicon glyphicon-trash"/>
                                                    </a>
                                                </form>
                                            </td>
                                            <td/>
                                            <td/>
                                        </tr>
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
                                                    {(() => {
                                                        if (employee.researches_ended) {
                                                            return (
                                                                <Link to={`employees/print/${employee.id}`}
                                                                      className="btn btn-secondary btn-sm pull-left">
                                                                    Направление
                                                                    <i className="glyphicon glyphicon-pencil"/>
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
        organization: state.organizations.organization
    };
}

Organization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Organization);

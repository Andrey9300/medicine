import React from 'react';
import {connect} from 'react-redux';
import {deleteOrganization, fetchOrganization} from './../../actions/organizationActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import OrganizationUsersInCard from './OrganizationUsersInCard';

class Organization extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            organizationId: props.params.id,
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganization(this.state.organizationId));
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteOrganization(id));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
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
                                    {organization.name}
                                </CardHeader>
                                <CardBlock className="card-body">

                                    <Table responsive>
                                        <tbody>
                                        <tr>
                                            <td>Адрес: </td>
                                            <td>{organization.address}</td>
                                            <td>Юридический адрес: </td>
                                            <td>{organization.legal_entity}</td>
                                        </tr>
                                        <tr>
                                            <td>Телефон: </td>
                                            <td>-{organization.phone}</td>
                                            <td>Сертифицирован: </td>
                                            <td>{organization.is_certification}</td>
                                        </tr>
                                        <tr>
                                            <td>Региональный менеджер: </td>
                                            <td>-</td>
                                            <td>E-mail регионального менеджера: </td>
                                            <td>{organization.regional_email}</td>
                                        </tr>
                                        <tr>
                                            <td>Руководитель: </td>
                                            <td>{organization.head_fio}</td>
                                            <td>E-mail руководителя: </td>
                                            <td>{organization.head_email}</td>
                                        </tr>
                                        <tr>
                                            <td>Шеф-повар: </td>
                                            <td>-</td>
                                            <td>E-mail шеф-повара: </td>
                                            <td>{organization.chef_email}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to={`organizations/edit/${organization.id}`}
                                                      className="btn btn-success btn-xs pull-left">Редактировать
                                                    <i className="glyphicon glyphicon-pencil"></i>
                                                </Link>
                                            </td>
                                            <td>
                                                <form id={`form_${organization.id}`} className="pull-left" method="post">
                                                    <input type="hidden" name="organization_id" value={organization.id} />
                                                    <a className="btn btn-danger btn-xs"
                                                       onClick={(event) => this.handleBtnDelete(organization.id, event)}
                                                       href="#" id={organization.id}>Удалить
                                                        <i className="glyphicon glyphicon-trash"></i>
                                                    </a>
                                                </form>
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
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
                <OrganizationUsersInCard
                    idOrganization={this.state.organizationId}
                />
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

export default connect(mapStateToProps)(Organization);

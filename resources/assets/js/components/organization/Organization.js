import React from 'react';
import {connect} from 'react-redux';
import {fetchOrganization} from './../../actions/organizationActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import OrganizationUsersInCard from './OrganizationUsersInCard';
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

    render() {
        const {organization} = this.props.organization;
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
                                    <i className="fa fa-building-o" aria-hidden="true"/>{organization.name}
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
                                            <td>Телефон руководителя: </td>
                                            <td>{organization.phone}</td>
                                            <td>Сертифицирован: </td>
                                            <td>
                                                {(() => {
                                                    switch (organization.is_certification) {
                                                        case 1:
                                                            return 'ISO 22000:2005';
                                                        case 0:
                                                            return 'Нет';
                                                        default:
                                                            return 'Нет';
                                                    }
                                                })()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Региональный менеджер: </td>
                                            <td>{organization.regional_fio}</td>
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
                                            <td/>
                                            <td>E-mail шеф-повара: </td>
                                            <td>{organization.chef_email}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to={`organizations/edit/${organization.id}`}
                                                      className="btn btn-success btn-xs pull-left">Редактировать
                                                    <i className="glyphicon glyphicon-pencil"/>
                                                </Link>
                                            </td>
                                            <td/>
                                            <td/>
                                            <td/>
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

Organization.propTypes = {
    dispatch: PropTypes.func.isRequired,
    organization: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Organization);

import React from 'react';
import {connect} from 'react-redux';
import {fetchOrganization, deleteOrganization} from './../../../actions/organizationActions';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';
import {fetchHospitals} from '../../../actions/hospitalActions';

class Budget extends React.Component {
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

Budget.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Budget);

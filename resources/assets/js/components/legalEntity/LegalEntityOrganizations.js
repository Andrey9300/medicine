import {fetchOrganizations} from '../../actions/organizationActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class LegalEntityOrganizations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            legalEntityId: props.params.legalEntityId
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganizations(this.state.legalEntityId));
    }

    render() {
        const {organizations} = this.props;

        if (organizations === null) {
            return null;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-building-o" aria-hidden="true"/>Объекты
                                ({organizations.length})
                                <Link to="organizations/create" className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Юридическое лицо</th>
                                        <th>Руководитель</th>
                                        <th>E-mail руководителя</th>
                                        <th>Сотрудники</th>
                                        <th>Редактировать</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {organizations.map((organization) => {
                                        return (
                                            <tr key={organization.id}>
                                                <td>
                                                    <Link to={`organizations/${organization.id}`}>
                                                        {organization.name}
                                                    </Link>
                                                </td>
                                                <td>{organization.legal_entity.name}</td>
                                                <td>{organization.head_fio}</td>
                                                <td>{organization.head_email}</td>
                                                <td>
                                                    <Link to={`organizations/employees/${organization.id}`}
                                                          className="btn btn-info btn-xs pull-left">Сотрудники
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`organizations/edit/${organization.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
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
            </div>
        );
    }
}

LegalEntityOrganizations.propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizations: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        organizations: state.organizations.organizations
    };
};

export default connect(mapStateToProps)(LegalEntityOrganizations);

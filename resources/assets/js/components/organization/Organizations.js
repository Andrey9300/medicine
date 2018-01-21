import {fetchOrganizations} from '../../actions/organizationActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class Organizations extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchOrganizations());
    }

    render() {
        const {user} = this.props;
        let linkAdd = null;

        if (user && user.role === 'admin') {
            linkAdd =
                <Link to="organizations/create" className="btn btn-primary btn-sm pull-right">
                    Добавить <i className="icon-plus"/>
                </Link>;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-building-o" aria-hidden="true"/>Объекты
                                ({this.props.organizations.length})
                                {linkAdd}
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Юридическое лицо</th>
                                            <th>Наименование</th>
                                            <th>Адрес</th>
                                            <th>Руководитель</th>
                                            <th>Телефон</th>
                                            <th>E-mail</th>
                                            <th>Сотрудники</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.organizations.map((organization) => {
                                        return (
                                            <tr key={organization.id}>
                                                <td>{organization.legal_entity.name}</td>
                                                <td>
                                                    <Link to={`organizations/${organization.id}`}>
                                                        {organization.name}
                                                    </Link>
                                                </td>
                                                <td>{organization.address}</td>
                                                <td>{organization.head_fio}</td>
                                                <td>{organization.phone}</td>
                                                <td>{organization.head_email}</td>
                                                <td>
                                                    <Link to={`organizations/employees/${organization.id}`}
                                                          className="btn btn-info btn-xs pull-left">Сотрудники
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

Organizations.propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizations: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        organizations: state.organizations.organizations,
        user: state.users.user
    };
};

export default connect(mapStateToProps)(Organizations);

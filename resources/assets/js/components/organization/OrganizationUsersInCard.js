import {fetchOrganizationUsers} from '../../actions/organizationActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table
} from 'reactstrap';
import PropTypes from 'prop-types';

class OrganizationUsersInCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            organizationId: props.idOrganization
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganizationUsers(this.state.organizationId));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-users" aria-hidden="true"/>Сотрудники
                                 ({this.props.organizationUsers.length})
                                <Link to="users/create" className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Должность</th>
                                        <th>Статус МО</th>
                                        <th>Сформировать направление</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.organizationUsers.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>
                                                    <Link to={`users/${user.id}`}>
                                                        {user.fio}
                                                    </Link>
                                                </td>
                                                <td>{user.role}</td>
                                                <td>
                                                    {(() => {
                                                        let text = '';

                                                        if (user.researches_expired) {
                                                            text = 'Просрочено';
                                                        } else if (user.researches_ended) {
                                                            text = 'Заканчивается';
                                                        }

                                                        return (
                                                            <span className="badge badge-danger">
                                                                {text}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td>
                                                    {(() => {
                                                        if (user.researches_ended) {
                                                            return (
                                                                <Link to={`users/print/${user.id}`}
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
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{researchesUser: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        organizationUsers: state.organizations.organizationUsers
    };
}

OrganizationUsersInCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    idOrganization: PropTypes.number.isRequired,
    organizationUsers: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(OrganizationUsersInCard);

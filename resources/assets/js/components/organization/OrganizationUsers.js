import {fetchOrganizationUsers, deleteOrganizationUser} from '../../actions/organizationActions';
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

class OrganizationUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            organizationId: props.params.idOrganization
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchOrganizationUsers(this.state.organizationId));
    }

    handleBtnDelete(idUser, event) {
        event.preventDefault();
        this.props.dispatch(deleteOrganizationUser(this.state.organizationId, idUser));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/>Цены на исследования
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
                                        <th>Исследования</th>
                                        <th>Редактировать</th>
                                        <th>Удалить</th>
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
                                                    <Link to={`users/researches/${user.id}`}
                                                          className="btn btn-primary btn-xs pull-left">Исследования
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`users/edit/${user.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${user.id}`} className="pull-left" method="post">
                                                        <input type="hidden" name="user_id" value={user.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(user.id, event)}
                                                           href="#" id={user.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"/>
                                                        </a>
                                                    </form>
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

OrganizationUser.propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizationUsers: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(OrganizationUser);

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

class OrganizationUsersInCard extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            organizationId: props.idOrganization, // не будет работать на картчоке объекта
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
                                <i className="fa fa-align-justify"></i>Сотрудники
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
                                    { this.props.organizationUsers.map((user, index) => {
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
                                                        <i className="glyphicon glyphicon-pencil"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`users/edit/${user.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${user.id}`} className="pull-left" method="post">
                                                        <input type="hidden" name="user_id" value={user.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(user.id, event)}
                                                           href="#" id={user.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"></i>
                                                        </a>
                                                    </form>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                                <Link to="users/create" className="btn btn-primary btn-sm pull-left">
                                    Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                                </Link>
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
export default connect(mapStateToProps)(OrganizationUsersInCard);

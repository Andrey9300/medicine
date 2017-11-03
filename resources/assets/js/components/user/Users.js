import {deleteUser, fetchUsers} from '../../actions/userActions';
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

class Users extends React.Component {

    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchUsers());
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteUser(id));
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
                                        <th>Организация</th>
                                        <th>Редактировать</th>
                                        <th>Удалить</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.users.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>
                                                    <Link to={`users/${user.id}`}>
                                                        {user.fio}
                                                    </Link>
                                                </td>
                                                <td>{user.role}</td>
                                                <td>{user.organization_name}</td>
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
 * @returns {{users: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        users: state.users.users
    };
}
export default connect(mapStateToProps)(Users);

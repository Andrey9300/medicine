import {deleteUser, fetchUsers} from '../../actions/userActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';

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
            <div>
                <h1 className="pull-left">Сотрудники</h1>
                <div className="col-lg-12">
                    <Link to="users/create" className="btn btn-primary btn-sm pull-left">
                        Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                    </Link>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Дата рождения</th>
                                <th>Дата приема на работу</th>
                                <th>Номер мед книжки</th>
                                <th>Должность</th>
                                <th>E-mail</th>
                                <th>Организация</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.users.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.fio}</td>
                                        <td>{user.date_birthday}</td>
                                        <td>{user.date_employment}</td>
                                        <td>{user.medical_book}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>{user.organization_name}</td>
                                        <td>
                                            <Link to={`users/${user.id}`}
                                                  className="btn btn-warning btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <Link to={`users/researches/${user.id}`}
                                                  className="btn btn-primary btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <Link to={`users/edit/${user.id}`}
                                                  className="btn btn-success btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <form id={`form_${user.id}`} className="pull-left" method="post">
                                                <input type="hidden" name="user_id" value={user.id} />
                                                <a className="btn btn-danger btn-xs"
                                                   onClick={(event) => this.handleBtnDelete(user.id, event)}
                                                   href="#" id={user.id}>
                                                    <i className="glyphicon glyphicon-trash"></i>
                                                </a>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
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

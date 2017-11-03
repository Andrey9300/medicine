import React from 'react';
import {connect} from 'react-redux';
import {fetchUser} from './../../actions/userActions';
import UserResearches from './research/UserResearches';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';

class UserPrint extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         errors: '',
    //         userId: props.params.id,
    //     };
    // }
    //
    // componentWillMount() {
    //     this.props.dispatch(fetchUser(this.state.userId));
    // }
    //
    // createMarkup() {
    //     return {
    //         __html: this.state.errors
    //     };
    // }

    render() {
        const {user} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (user !== null) {
            formElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <Card>
                                <CardHeader>
                                    {user.fio}
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td>Дата рождения: </td>
                                                <td>{user.date_birthday}</td>
                                            </tr>
                                            <tr>
                                                <td>Дата устройства на работу: </td>
                                                <td>{user.date_employment}</td>
                                            </tr>
                                            <tr>
                                                <td>Номер мед книжки: </td>
                                                <td>{user.medical_book}</td>
                                            </tr>
                                            <tr>
                                                <td>Должность: </td>
                                                <td>{user.role}</td>
                                            </tr>
                                            <tr>
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
                {formElements}
                <UserResearches
                    idUser={this.state.userId}
                />
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{user: (*|null)}}
 */
// function mapStateToProps(state) {
//     return {
//         user: state.users.user
//     };
// }
//
// export default connect(mapStateToProps)(UserPrint);

import {fetchUserResearches, deleteUserResearch} from '../../../actions/userActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {Table, Row, Col, Card, CardHeader, CardBlock} from 'reactstrap';

class UserResearches extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            userId: props.idUser,
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchUserResearches(this.state.userId));
    }

    handleBtnDelete(idResearch, event) {
        event.preventDefault();
        this.props.dispatch(deleteUserResearch(this.state.userId, idResearch));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>Исследования сотрудника
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Период</th>
                                        <th>Дата</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.userResearches.map((research) => {
                                        return (
                                            <tr key={research.id}>
                                                <td>{research.name}</td>
                                                <td>
                                                    {(() => {
                                                        switch (research.period) {
                                                            case '-1':
                                                                return 'При поступлении на работу. При смене юридического лица';
                                                            case '1':
                                                                return 'Раз в жизни';
                                                            case '365':
                                                                return 'Раз в год';
                                                            case '730':
                                                                return 'Раз в два года';
                                                            case '1827':
                                                                return 'Раз в 5 лет';
                                                            case '3653':
                                                                return 'Раз в 10 лет';
                                                            default :
                                                                return research.period;
                                                        }
                                                    })()}
                                                </td>
                                                <td>{research.pivot.date}</td>
                                                <td>
                                                    <Link to={`users/researches/edit/${this.state.userId}/${research.id}`}
                                                          className="btn btn-primary btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"></i>
                                                    </Link>
                                                    <form id={`form_${research.id}`} className="pull-left" method="post">
                                                        <input type="hidden" name="user_research_id" value={research.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(research.id, event)}
                                                           href="#" id={research.id}>Удалить
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
                                <Link to={`users/researches/${this.state.userId}/create`} className="btn btn-primary btn-sm pull-left">
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
        userResearches: state.users.userResearches
    };
}
export default connect(mapStateToProps)(UserResearches);

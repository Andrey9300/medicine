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

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-heartbeat" aria-hidden="true"></i>Исследования сотрудника
                                <Link to={`users/researches/${this.state.userId}/create`} className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"></i>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Период</th>
                                        <th>Дата</th>
                                        <th>Редактировать</th>
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
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"></i>
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

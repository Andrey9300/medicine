import {fetchUserResearches, deleteUserResearch} from '../../../actions/userActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';

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
            <div>
                <h1 className="pull-left">Исследования сотрудника</h1>
                <div className="col-lg-12">
                    <Link to={`users/researches/${this.state.userId}/create`} className="btn btn-primary btn-sm pull-left">
                        Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                    </Link>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Период</th>
                                <th>Дата</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.userResearches.map((research, index) => {
                                return (
                                    <tr key={research.id}>
                                        <td>{research.name}</td>
                                        <td>{research.period}</td>
                                        <td>{research.pivot.date}</td>
                                        <td>
                                            <Link to={`users/researches/edit/${this.state.userId}/${research.id}`}
                                                  className="btn btn-primary btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <form id={`form_${research.id}`} className="pull-left" method="post">
                                                <input type="hidden" name="user_research_id" value={research.id} />
                                                <a className="btn btn-danger btn-xs"
                                                   onClick={(event) => this.handleBtnDelete(research.id, event)}
                                                   href="#" id={research.id}>
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
 * @returns {{researchesUser: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        userResearches: state.users.userResearches
    };
}
export default connect(mapStateToProps)(UserResearches);

import {fetchHospitalResearches, deleteHospitalResearch} from '../../../actions/hospitalActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';

class HospitalResearches extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            hospitalId: props.idHospital,
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchHospitalResearches(this.state.hospitalId));
    }

    handleBtnDelete(idResearch, event) {
        event.preventDefault();
        this.props.dispatch(deleteHospitalResearch(this.state.hospitalId, idResearch));
    }

    render() {
        return (
            <div>
                <h1 className="pull-left">Цены на исследования</h1>
                <div className="col-lg-12">
                    <Link to={`hospitals/researches/${this.state.hospitalId}/create`} className="btn btn-primary btn-sm pull-left">
                        Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                    </Link>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Период</th>
                                <th>Цена</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.hospitalResearches.map((research, index) => {
                                return (
                                    <tr key={research.id}>
                                        <td>{research.name}</td>
                                        <td>{research.period}</td>
                                        <td>{research.pivot.price}</td>
                                        <td>
                                            <Link to={`hospitals/researches/edit/${this.state.hospitalId}/${research.id}`}
                                                  className="btn btn-primary btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <form id={`form_${research.id}`} className="pull-left" method="post">
                                                <input type="hidden" name="hospital_research_id" value={research.id} />
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
 * @returns {{researchesHospital: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        hospitalResearches: state.hospitals.hospitalResearches
    };
}
export default connect(mapStateToProps)(HospitalResearches);

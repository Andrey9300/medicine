import {deleteResearch, fetchResearches} from '../../actions/researchActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';

class Researches extends React.Component {

    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchResearches());
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteResearch(id));
    }

    render() {
        return (
            <div>
                <h1 className="pull-left">Исследования</h1>
                <div className="col-lg-12">
                    <Link to="researches/create" className="btn btn-primary btn-sm pull-left">
                        Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                    </Link>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Период</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.researches.map((research, index) => {
                                return (
                                    <tr key={research.id}>
                                        <td>{research.name}</td>
                                        <td>{research.period}</td>
                                        <td>
                                            <Link to={`researches/edit/${research.id}`}
                                                  className="btn btn-success btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <form id={`form_${research.id}`} className="pull-left" method="post">
                                                <input type="hidden" name="research_id" value={research.id} />
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
 * @returns {{researches: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        researches: state.researches.researches
    };
}
export default connect(mapStateToProps)(Researches);

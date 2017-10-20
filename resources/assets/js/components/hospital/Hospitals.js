import {deleteHospital, fetchHospitals} from '../../actions/hospitalActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';

class Hospitals extends React.Component {

    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchHospitals());
    }

    handleBtnDelete(id, event) {
        event.preventDefault();
        this.props.dispatch(deleteHospital(id));
    }

    render() {
        return (
            <div>
                <h1 className="pull-left">Медицинские организации</h1>
                <div className="col-lg-12">
                    <Link to="hospitals/create" className="btn btn-primary btn-sm pull-left">
                        Добавить &nbsp; <i className="glyphicon glyphicon-plus"></i>
                    </Link>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Адрес</th>
                                <th>Расписание</th>
                                <th>Фото карты</th>
                                <th>Телефон</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.hospitals.map((hospital, index) => {
                                return (
                                    <tr key={hospital.id}>
                                        <td>{hospital.name}</td>
                                        <td>{hospital.address}</td>
                                        <td>{hospital.shedule}</td>
                                        <td>{hospital.photo_map}</td>
                                        <td>{hospital.phone}</td>
                                        <td>
                                            <Link to={`hospitals/edit/${hospital.id}`}
                                                  className="btn btn-success btn-xs pull-left">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </Link>
                                            <form id={`form_${hospital.id}`} className="pull-left" method="post">
                                                <input type="hidden" name="hospital_id" value={hospital.id} />
                                                <a className="btn btn-danger btn-xs"
                                                   onClick={(event) => this.handleBtnDelete(hospital.id, event)}
                                                   href="#" id={hospital.id}>
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
 * @returns {{hospitals: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        hospitals: state.hospitals.hospitals
    };
}
export default connect(mapStateToProps)(Hospitals);

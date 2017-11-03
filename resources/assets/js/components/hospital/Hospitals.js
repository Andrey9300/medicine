import {deleteHospital, fetchHospitals} from '../../actions/hospitalActions';
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

class Hospitals extends React.Component {

    constructor() {
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchHospitals());
    }

    handleBtnDelete(hospitalId, event) {
        event.preventDefault();
        this.props.dispatch(deleteHospital(hospitalId));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>Медицинские организации
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Адрес</th>
                                        <th>Расписание</th>
                                        <th>Телефон</th>
                                        <th>Редактировать</th>
                                        <th>Удалить</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.hospitals.map((hospital) => {
                                        return (
                                            <tr key={hospital.id}>
                                                <td>
                                                    <Link to={`hospitals/${hospital.id}`}>
                                                        {hospital.name}
                                                    </Link>
                                                </td>
                                                <td>{hospital.address}</td>
                                                <td>{hospital.shedule}</td>
                                                <td>{hospital.phone}</td>
                                                <td>
                                                    <Link to={`hospitals/edit/${hospital.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"></i>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${hospital.id}`}
                                                          className="pull-left" method="post">
                                                        <input type="hidden" name="hospital_id"
                                                               value={hospital.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(hospital.id, event)}
                                                           href="#" id={hospital.id}>Удалить
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
                                <Link to="hospitals/create" className="btn btn-primary btn-sm pull-left">
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
 * @returns {{hospitals: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        hospitals: state.hospitals.hospitals
    };
}
export default connect(mapStateToProps)(Hospitals);

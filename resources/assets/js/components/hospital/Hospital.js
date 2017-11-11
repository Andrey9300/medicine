import React from 'react';
import {connect} from 'react-redux';
import {fetchHospital, deleteHospital} from './../../actions/hospitalActions';
import HospitalResearches from './research/HospitalResearches';
import {Link} from 'react-router';
import {Row, Col, Card, CardHeader, CardBlock, Table} from 'reactstrap';
import PropTypes from 'prop-types';

class Hospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.params.id
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchHospital(this.state.hospitalId));
    }

    handleBtnDelete(hospitalId, event) {
        event.preventDefault();
        this.props.dispatch(deleteHospital(hospitalId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    render() {
        const {hospital} = this.props.hospital;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (hospital !== null) {
            formElements =
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <Card>
                                <CardHeader>
                                    {hospital.name}
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td>Адрес: </td>
                                                <td>{hospital.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Расписание: </td>
                                                <td>{hospital.shedule}</td>
                                            </tr>
                                            <tr>
                                                <td>Телефон: </td>
                                                <td>{hospital.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Link to={`hospitals/edit/${hospital.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
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
                                                            <i className="glyphicon glyphicon-trash"/>
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
                <HospitalResearches
                    idHospital={this.state.hospitalId}
                />
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{hospital: (*|null)}}
 */
function mapStateToProps(state) {
    return {
        hospital: state.hospitals.hospital
    };
}

Hospital.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hospital: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Hospital);

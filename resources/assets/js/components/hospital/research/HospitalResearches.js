import {fetchHospitalResearches, deleteHospitalResearch} from '../../../actions/hospitalActions';
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
import PropTypes from 'prop-types';

class HospitalResearches extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            hospitalId: props.idHospital
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
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-rub" aria-hidden="true"/>Цены на исследования
                                <Link to={`hospitals/researches/${this.state.hospitalId}/create`}
                                      className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Цена</th>
                                        <th>Редактировать</th>
                                        <th>Удалить</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.hospitalResearches.map((research) => {
                                        return (
                                            <tr key={research.id}>
                                                <td>{research.name}</td>
                                                <td>{research.pivot.price}
                                                    <i className="fa fa-rub" aria-hidden="true"/>
                                                </td>
                                                <td>
                                                    <Link to={`hospitals/researches/edit/${this.state.hospitalId}/${research.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <form id={`form_${research.id}`}
                                                          className="pull-left"
                                                          method="post">
                                                        <input type="hidden"
                                                               name="hospital_research_id"
                                                               value={research.id} />
                                                        <a className="btn btn-danger btn-xs"
                                                           onClick={(event) => this.handleBtnDelete(research.id, event)}
                                                           href="#" id={research.id}>Удалить
                                                            <i className="glyphicon glyphicon-trash"/>
                                                        </a>
                                                    </form>
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
 * @returns {{researchesHospital: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        hospitalResearches: state.hospitals.hospitalResearches
    };
}

HospitalResearches.propTypes = {
    dispatch: PropTypes.func.isRequired,
    hospitalResearches: PropTypes.array.isRequired,
    idHospital: PropTypes.number.isRequired,
    router: PropTypes.object.isRequired
};


export default connect(mapStateToProps)(HospitalResearches);

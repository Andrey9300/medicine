import {fetchEmployeeResearches} from '../../../actions/employeeActions';
import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {
    Table,
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock
} from 'reactstrap';
import PropTypes from 'prop-types';

class EditEmployeeResearches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            employeeId: props.idEmployee
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployeeResearches(this.state.employeeId));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-heartbeat" aria-hidden="true"/>Исследования сотрудника
                                <Link to={`employees/researches/${this.state.employeeId}/create`}
                                      className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
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
                                    { this.props.employeeResearches.map((research) => {
                                        return (
                                            <tr key={research.id}>
                                                <td>{research.name}</td>
                                                <td>
                                                    {(() => {
                                                        switch (research.period) {
                                                            case '-1':
                                                                return 'При поступлении на работу. ' +
                                                                    'При смене юридического лица';
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
                                                    <Link to={`employees/researches/edit/${this.state.employeeId}/${research.id}`}
                                                          className="btn btn-success btn-xs pull-left">Редактировать
                                                        <i className="glyphicon glyphicon-pencil"/>
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
 * @returns {{researchesEmployee: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        employeeResearches: state.employees.employeeResearches
    };
}

EditEmployeeResearches.propTypes = {
    dispatch: PropTypes.func.isRequired,
    idEmployee: PropTypes.number.isRequired,
    router: PropTypes.object.isRequired,
    employeeResearches: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(EditEmployeeResearches);

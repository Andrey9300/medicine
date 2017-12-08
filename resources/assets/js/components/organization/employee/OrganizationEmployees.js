import {fetchHospitalResearches} from '../../../actions/hospitalActions';
import React from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Table,
    Form,
    Button,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

class OrganizationEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            employees: props.employees
        };
        this.handleClick = this.handleClick.bind(this);
        console.log(props.employees);
    }

    componentWillMount() {

    }

    handleClick() {
        const formElement = document.getElementById('hospitalResearch');

        axios.post(`/hospitals/researches/store/${this.state.hospitalId}`, new FormData(formElement))
            .then(() => {
                alert('Изменения сохранены');
            })
            .catch((error) => {
                const errors = error;

                this.setState({
                    errors: errors
                });
            });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-users" aria-hidden="true"/>Сотрудники
                                ({organization.employees.length})
                                <Link to={`organizations/employees/create/${this.state.organizationId}`}
                                      className="btn btn-primary btn-sm pull-right">
                                    Добавить <i className="icon-plus"/>
                                </Link>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>ФИО</th>
                                        <th>Статус МО</th>
                                        <th>Сформировать направление</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { organization.employees.map((employee) => {
                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <Link to={`employees/${employee.id}`}>
                                                        {employee.fio}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {(() => {
                                                        let text = '';
                                                        let classSpan = '';

                                                        if (employee.researches_expired) {
                                                            text = 'Просрочено';
                                                            classSpan = 'badge badge-danger';
                                                        } else if (employee.researches_ended) {
                                                            text = 'Заканчивается';
                                                            classSpan = 'badge badge-warning';
                                                        }

                                                        return (
                                                            <span className={classSpan}>
                                                                    {text}
                                                                </span>
                                                        );
                                                    })()}
                                                </td>
                                                <td>
                                                    {(() => {
                                                        if (employee.researches_ended) {
                                                            return (
                                                                <Link to={`employees/print/${employee.id}`}
                                                                      className="btn btn-secondary btn-sm pull-left">
                                                                    Направление
                                                                    <i className="glyphicon glyphicon-pencil"/>
                                                                </Link>
                                                            );
                                                        }

                                                        return '';
                                                    })()}
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
                </Row>*
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
        // hospitalResearches: state.hospitals.hospitalResearches
    };
}

OrganizationEmployees.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default connect(mapStateToProps)(OrganizationEmployees);

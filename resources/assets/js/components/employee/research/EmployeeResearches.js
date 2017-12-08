import {fetchEmployeeResearches} from '../../../actions/employeeActions';
import React from 'react';
import {connect} from 'react-redux';
import {
    Table,
    Row,
    Col,
    Card,
    CardHeader,
    CardBlock,
    Button,
    Form,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

class EmployeeResearches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            employeeId: props.idEmployee
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchEmployeeResearches(this.state.employeeId));
    }

    handleClick() {
        const formElement = document.getElementById('employeeResearch');

        axios.post(`/employees/researches/store/${this.state.employeeId}`, new FormData(formElement))
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
                                <i className="fa fa-heartbeat" aria-hidden="true"/>Даты исследований
                                ({this.props.employeeResearches.length})
                                <Button type="submit" size="sm"
                                        color="success pull-right"
                                        onClick={this.handleClick}
                                >
                                    <i className="fa fa-dot-circle-o"/> Сохранить
                                </Button>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form id="employeeResearch">
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>Категория</th>
                                            <th>Исследование</th>
                                            <th>Дата</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { this.props.employeeResearches.map((employeeResearch) => {
                                            return (
                                                <tr key={employeeResearch.id}>
                                                    <td>{employeeResearch.category.name}</td>
                                                    <td>{employeeResearch.research.name}</td>
                                                    <td>
                                                        <Input type="text"
                                                               name={`employeeResearch[${employeeResearch.pivot.id}]`}
                                                               defaultValue={employeeResearch.date}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        }
                                        </tbody>
                                    </Table>
                                </Form>
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

EmployeeResearches.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(EmployeeResearches);

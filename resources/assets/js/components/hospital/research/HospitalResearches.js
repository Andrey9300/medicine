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

class HospitalResearches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.idHospital
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchHospitalResearches(this.state.hospitalId));
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
                                <i className="fa fa-heartbeat" aria-hidden="true"/>Цены на исследования
                                ({this.props.hospitalResearches.length})
                                <Button type="submit" size="sm"
                                        color="success pull-right"
                                        onClick={this.handleClick}
                                >
                                    <i className="fa fa-dot-circle-o"/> Сохранить
                                </Button>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form id="hospitalResearch">
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>Категория</th>
                                            <th>Исследование</th>
                                            <th>Цена</th>
                                            <th>Валюта</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { this.props.hospitalResearches.map((research) => {
                                            return (
                                                <tr key={research.id}>
                                                    <td>{research.category.name}</td>
                                                    <td>{research.research.name}</td>
                                                    <td>
                                                        <Input type="text"
                                                               name={`hospitalResearch[${research.pivot.id}]`}
                                                               defaultValue={research.price}
                                                        />
                                                    </td>
                                                    <td><i className="fa fa-rub" aria-hidden="true"/></td>
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
 * @returns {{researchesHospital: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        hospitalResearches: state.hospitals.hospitalResearches
    };
}

HospitalResearches.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default connect(mapStateToProps)(HospitalResearches);

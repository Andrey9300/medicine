import {fetchUserResearches} from '../../actions/researchActions';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Row, Col, Card, CardHeader, CardBlock, Table, Form, Button, Input} from 'reactstrap';

class Researches extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchUserResearches());
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleClick() {
        const formElement = document.querySelector('form');

        axios.post('/userResearches/store', new FormData(formElement))
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
                    <Col xs="12" md="12" lg="8">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-heartbeat" aria-hidden="true"/>Исследования
                                ({this.props.userResearches.length})
                                <Button type="submit" size="sm"
                                        color="success pull-right"
                                        onClick={this.handleClick}
                                >
                                    <i className="fa fa-dot-circle-o"/> Сохранить
                                </Button>
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form>
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th>Категория</th>
                                            <th>Исследование</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            { this.props.userResearches.map((research) => {
                                                let check = '';

                                                if (research.check) {
                                                    check = 'checked';
                                                }

                                                return (
                                                    <tr key={research.id}>
                                                        <td>{research.category.name}</td>
                                                        <td>{research.research.name}</td>
                                                        <td>
                                                            <Input type="checkbox"
                                                                   name={`research[${research.id}]`}
                                                                   defaultChecked={check}
                                                                   value={research.id}
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

Researches.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userResearches: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        userResearches: state.researches.userResearches
    };
};

export default connect(mapStateToProps)(Researches);

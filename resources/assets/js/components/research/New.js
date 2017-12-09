import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {fetchPeriods} from '../../actions/researchPeriodActions';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';

class NewResearch extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchPeriods());
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post('/researches/store', formData)
            .then(() => {
                hashHistory.push('researches');
            })
            .catch((errors) => {
                this.setState({
                    errors: errors.response.data.errors
                });
            });
    }

    createMarkup() {
        let html = '';

        Object.keys(this.state.errors).forEach((item) => {
            this.state.errors[item].forEach((value) => {
                html += `<p>${value}</p>`;
            });
        });

        return {
            __html: html
        };
    }

    render() {
        let errors = '';

        if (this.state.errors) {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        return (
            <div className="animated fadeIn">
                {errors}
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Добавить исследование
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name" placeholder="Наименование"/>
                                            <FormText color="muted">Введите наименование</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Периодичность</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="period_id" id="period_id">
                                                { this.props.researchPeriods.map((period) => {
                                                    return (
                                                        <option key={period.id} value={period.id}>
                                                            {period.name}
                                                        </option>
                                                    );
                                                })
                                                }
                                            </Input>
                                            <FormText color="muted">Выберите периодичность</FormText>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBlock>
                            <CardFooter>
                                <Button type="submit" size="sm" color="success" onClick={this.handleSubmit}>
                                    <i className="fa fa-dot-circle-o"/> Сохранить
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

NewResearch.propTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        researchPeriods: state.researchPeriods.researchPeriods
    };
};

export default connect(mapStateToProps)(NewResearch);

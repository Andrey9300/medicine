import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchResearch} from './../../actions/researchActions';
import PropTypes from 'prop-types';
import {Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, FormGroup, FormText, Label, Input
} from 'reactstrap';

class EditResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            researchId: props.params.id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');

        axios.post(`/researches/update/${this.state.researchId}`, new FormData(formElement))
            .then(() => {
                history.pushState(null, null, '/researches');
            })
            .catch((error) => {
                const errors = error;

                this.setState({
                    errors: errors
                });
            });
    }

    componentWillMount() {
        this.props.dispatch(fetchResearch(this.state.researchId));
    }

    createMarkup() {
        return {
            __html: this.state.errors
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.research && nextProps.research && nextProps.research.name !== this.props.research.name) {
            window.location.reload();
        }
    }

    render() {
        const {research} = this.props;
        let errors = '';
        let formElements = '';

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        if (research !== null) {
            formElements =
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                Редактировать исследование
                            </CardHeader>
                            <CardBlock className="card-body">
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Наименование</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name" name="name" defaultValue={research.name}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Период</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="period_id" id="select"
                                                   defaultValue={research.research_period.id}>
                                                { this.props.periods.map((period) => {
                                                    return (
                                                        <option key={period.id} value={period.id}>
                                                            {period.name}
                                                        </option>
                                                    );
                                                })
                                                }
                                            </Input>
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
                </Row>;
        }

        return (
            <div className="animated fadeIn">
                {errors}
                {formElements}
            </div>
        );
    }
}

EditResearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    periods: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        research: state.researches.research,
        periods: state.researches.periods
    };
};

export default connect(mapStateToProps)(EditResearch);

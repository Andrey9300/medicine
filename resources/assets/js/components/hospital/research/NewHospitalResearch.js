import {fetchResearches} from '../../../actions/researchActions';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBlock,
    Form,
    FormGroup,
    FormText,
    Label,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';

class NewHospitalResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            hospitalId: props.params.idHospital
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchResearches());
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post(`/hospitals/researches/create/${this.props.params.idHospital}`, formData)
            .then(() => {
                this.context.router.push('/hospitals');
            })
            .catch((error) => {
                const errors = error.response.data.message;

                this.setState({
                    errors: errors
                });
            });
    }

    createMarkup() {
        return {
            __html: this.state.errors
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
                                    Добавить исследования к медицинской организации
                                </CardHeader>
                                <CardBlock className="card-body">
                                    <Form className="form-horizontal">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="select">Исследование</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="select" name="name" id="select">
                                                    {this.props.researches.map((research) => {
                                                        return (
                                                            <option key={research.id}
                                                                    value={research.id}>
                                                                {research.name}
                                                            </option>
                                                        );
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Цена</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="text" id="price" name="price" placeholder="Цена"/>
                                                <FormText color="muted">Введите цену</FormText>
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

/**
 * Map
 * @param state
 * @returns {{researchesHospital: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        researches: state.researches.researches
    };
}

NewHospitalResearch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    researches: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
};


export default connect(mapStateToProps)(NewHospitalResearch);

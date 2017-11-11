import React from 'react';
import axios from 'axios';
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

class NewResearch extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');
        const formData = new FormData(formElement);

        axios.post('/researches/create', formData)
            .then(() => {
                this.context.router.push('/researches');
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
                                            <Input type="select" name="period" id="select">
                                                <option value="-1">
                                                    При поступлении на работу.
                                                    При смене юридического лица
                                                </option>
                                                <option value="1">Раз в жизни</option>
                                                <option value="365">Раз в год</option>
                                                <option value="730">Раз в два года</option>
                                                <option value="1827">Раз в 5 лет</option>
                                                <option value="3653">Раз в 10 лет</option>
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

export default NewResearch;

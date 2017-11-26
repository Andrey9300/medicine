import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Container,
    Row,
    Col,
    CardGroup,
    Card,
    CardBlock,
    Form,
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import {hashHistory} from 'react-router';

class ResetPassword extends Component {
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

        axios.post('/password/reset', new FormData(formElement))
            .then(() => {
                hashHistory.push('/login');
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data.errors
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

        if (this.state.errors !== '') {
            errors = <div className="alert alert-danger" role="alert">
                <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>;
        }

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            {errors}
                            <CardGroup className="mb-0">
                                <Card className="p-4">
                                    <CardBlock className="card-body">
                                        <Form onSubmit={this.handleSubmit}>
                                            <h1>Сбросить пароль</h1>
                                            <p className="text-muted">Сброс пароля</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-envelope"/></InputGroupAddon>
                                                <Input type="email" name="email"
                                                       defaultValue={this.props.location.query.email} readOnly/>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                                                <Input type="password" name="password" placeholder="Пароль" required/>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                                                <Input type="password" name="password_confirmation"
                                                       placeholder="Подтвердите пароль" required/>
                                            </InputGroup>
                                            <Input type="hidden" name="token"
                                                   defaultValue={this.props.location.query.token}/>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4 btn-sm">
                                                        Сбросить пароль
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBlock>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

/**
 * Map
 * @param state
 * @returns {{users: (*|Array)}}
 */
function mapStateToProps(state) {
    return {
        users: state.users.users
    };
}

ResetPassword.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(ResetPassword);

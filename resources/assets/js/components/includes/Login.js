import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loginUser} from '../../actions/userActions';
import PropTypes from 'prop-types';
import axios from 'axios';
import {hashHistory} from 'react-router';
import {Container, Row, Col, CardGroup, Card, CardBlock, Form, Button, Input, InputGroup, InputGroupAddon
} from 'reactstrap';
import Sidebar from './Sidebar';
import {fetchHospital} from '../../actions/hospitalActions';

class Login extends Component {
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

        axios.post('/login', new FormData(formElement))
            .then(() => {
                hashHistory.push('/organizations');
                window.location.reload();
            })
            .catch((error) => {
                if (!error.response.data.errors) {
                    window.location.reload();
                }

                this.setState({
                    errors: error.response.data.errors
                });
            });
        // this.props.dispatch(loginUser(new FormData(formElement))); //TODO сделать через reducer
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
        if (this.props.user) {
            hashHistory.push('organizations');
        }

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
                                            <h1>Вход</h1>
                                            <p className="text-muted">Войдите в свой аккаунт</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-envelope"/></InputGroupAddon>
                                                <Input type="email" name="email" placeholder="E-mail" required/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                                                <Input type="password" name="password" placeholder="Пароль" required/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="4">
                                                    <Button color="primary" className="px-4 btn-sm">Войти</Button>
                                                </Col>
                                                <Col xs="4" className="text-right">
                                                    <Link to="registration" className="btn btn-success btn-sm">
                                                        Регистрация
                                                    </Link>
                                                </Col>
                                                <Col xs="4" className="text-right">
                                                    <Link to="restorePassword" className="btn btn-warning btn-sm">
                                                        Забыли пароль?
                                                    </Link>
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

Login.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.users.user
    };
};

export default connect(mapStateToProps)(Login);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registrationUser} from '../../actions/userActions';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    CardBlock,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    CardGroup
} from 'reactstrap';
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router';
import axios from 'axios';

class Registration extends Component {
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

        axios.post('/register', new FormData(formElement))
            .then(() => {
                alert('Вам отправлен email для активации аккаунта');

                axios.post('/logout', new FormData(formElement))
                    .then(() => {
                        hashHistory.push('/login');
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
            })
            .catch((error) => {
                if (!error.response.data.errors) {
                    window.location.reload();
                }

                this.setState({
                    errors: error.response.data.errors
                });
            });

        // this.props.dispatch(registrationUser(new FormData(formElement))); //TODO сделать через reducer
    }

    handleLogin() {
        hashHistory.push('login');
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
                                            <h1>Регистрация</h1>
                                            <p className="text-muted">Создайте свой аккаунт</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-user"/></InputGroupAddon>
                                                <Input type="text" name="fio" placeholder="ФИО"/>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon>@</InputGroupAddon>
                                                <Input type="email" name="email" placeholder="E-mail"/>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                                                <Input type="password" name="password" placeholder="Пароль"/>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                                                <Input type="password" name="password_confirmation"
                                                       placeholder="Повторите пароль"/>
                                            </InputGroup>
                                            <Button color="success" block>Создать аккаунт</Button>
                                            <Button color="primary" block onClick={this.handleLogin}>
                                                Уже есть аккаунт
                                            </Button>
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

Registration.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Registration);

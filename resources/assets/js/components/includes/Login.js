import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loginUser} from '../../actions/userActions';
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

class Login extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');

        this.props.dispatch(loginUser(new FormData(formElement)));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup className="mb-0">
                                <Card className="p-4">
                                    <CardBlock className="card-body">
                                        <Form onSubmit={this.handleSubmit}>
                                            <h1>Вход</h1>
                                            <p className="text-muted">Войдите в свой аккаунт</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-envelope"/></InputGroupAddon>
                                                <Input type="text" name="email" placeholder="E-mail"/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                                                <Input type="password" name="password" placeholder="Пароль"/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Войти</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Забыли пароль?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBlock>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                    <CardBlock className="card-body text-center">
                                        <div>
                                            <h2>Регистрация</h2>
                                            <Link to="registration" className="btn btn-primary btn-sm">
                                                Зарегистрироваться
                                                <i className="glyphicon glyphicon-pencil"/>
                                            </Link>
                                        </div>
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

Login.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Login);

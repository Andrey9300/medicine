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
    InputGroupAddon
} from 'reactstrap';
import PropTypes from 'prop-types';

class Registration extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formElement = document.querySelector('form');

        this.props.dispatch(registrationUser(new FormData(formElement)));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
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
                                            <Input type="password" name="password_confirmation" placeholder="Повторите пароль"/>
                                        </InputGroup>
                                        <Button color="success" block>Создать аккаунт</Button>
                                    </Form>
                                </CardBlock>
                            </Card>
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

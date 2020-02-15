import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container, Row, Col, CardGroup, Card, CardBlock, Form, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {loginUser} from '../../actions/userActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      doubleClick: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      doubleClick: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      doubleClick: true
    });
    this.props.dispatch(loginUser(document.querySelector('form')));
  }

  createMarkup() {
    let html = '';

    Object.keys(this.props.errors).forEach((item) => {
      this.props.errors[item].forEach((value) => {
        html += `<p>${value}</p>`;
      });
    });

    return {
      __html: html
    };
  }

  render() {
    const {user, errors} = this.props;
    const {doubleClick} = this.state;
    let errorsMessage = '';

    if (user && user.isAuthenticated) {
      window.history.pushState(null, null, '/#/organizations');
    }

    if (errors) {
      errorsMessage = <div className="alert alert-danger" role="alert">
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </div>;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              {errorsMessage}
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
                          <Button disabled={doubleClick}
                            color="primary"
                            className="px-4 btn-sm">Войти
                          </Button>
                        </Col>
                        <Col xs="4" className="text-right">
                          <Link to="registration" className="btn btn-success btn-sm">Регистрация</Link>
                        </Col>
                        <Col xs="4" className="text-right">
                          <Link to="restorePassword" className="btn btn-warning btn-sm">Забыли пароль?</Link>
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
    errors: state.users.errors,
    user: state.users.user
  };
};

export default connect(mapStateToProps)(Login);

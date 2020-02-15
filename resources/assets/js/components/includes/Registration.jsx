import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registrationUser} from '../../actions/userActions';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, Form, CardBlock, Button, Input, InputGroup, InputGroupAddon, CardGroup} from 'reactstrap';

class Registration extends Component {
  constructor(props) {
    super(props);

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
    this.props.dispatch(registrationUser(document.querySelector('form')));
  }

  handleLogin() {
    history.pushState(
      null,
      null,
      '/#/login'
    );
    window.location.reload();
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
    const {errors} = this.props;
    const {doubleClick} = this.state;
    let errorsMessage = '';

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
                      <h1>Регистрация</h1>
                      <p className="text-muted">Создайте свой аккаунт</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-user"/></InputGroupAddon>
                        <Input type="text" name="fio" placeholder="ФИО" required/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon>@</InputGroupAddon>
                        <Input type="email" name="email" placeholder="E-mail" required/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                        <Input type="password" name="password" placeholder="Пароль" required/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-lock"/></InputGroupAddon>
                        <Input type="password" name="password_confirmation"
                          placeholder="Повторите пароль" required/>
                      </InputGroup>
                      <Button color="success" block disabled={doubleClick}>Создать аккаунт</Button>
                      <Button color="primary" block onClick={this.handleLogin}>Уже есть аккаунт</Button>
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

Registration.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    errors: state.users.errors,
    users: state.users.users
  };
};

export default connect(mapStateToProps)(Registration);

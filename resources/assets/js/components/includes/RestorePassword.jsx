import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container, Row, Col, CardGroup, Card, CardBlock, Form, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class RestorePassword extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      errors: '',
      doubleClick: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formElement = document.querySelector('form');

    this.setState({
      doubleClick: true
    });

    axios.post(
      '/password/email',
      new FormData(formElement)
    )
      .then(() => {
        alert('Вам отправлено письмо');
        window.history.pushState(null, null, '/#/login');
        window.location.reload();
      })
      .catch((error) => {
        if (!error.response.data.errors) {
          window.location.reload();
        }

        this.setState({
          errors: error.response.data.errors,
          doubleClick: false
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
    const {errors, doubleClick} = this.state;
    let errorsMessage = '';

    if (errors !== '') {
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
                      <h1>Восстановить пароль</h1>
                      <p className="text-muted">Восстановление пароля</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-envelope"/></InputGroupAddon>
                        <Input type="email" name="email" placeholder="E-mail" required/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary"
                            className="px-4 btn-sm"
                            disabled={doubleClick}
                          >
                            Восстановить
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="login" className="btn btn-success btn-sm">
                            Вспомнил пароль
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

RestorePassword.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps)(RestorePassword);

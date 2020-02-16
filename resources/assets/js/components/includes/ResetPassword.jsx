import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container, Row, Col, CardGroup, Card, CardBlock, Form, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props);

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
      '/password/reset',
      new FormData(formElement)
    )
      .then(() => {
        history.pushState(
          null,
          null,
          '/#/login'
        );
        window.location.reload();
      })
      .catch((error) => {
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
    const {location} = this.props;
    const {errors, doubleClick} = this.state;
    const urlSearchParams = new URLSearchParams(location.search);
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
                      <h1>Сбросить пароль</h1>
                      <p className="text-muted">Сброс пароля</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-envelope"/></InputGroupAddon>
                        <Input type="email" name="email"
                          defaultValue={urlSearchParams.get('email')} readOnly/>
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
                        defaultValue={urlSearchParams.get('token')}/>
                      <Row>
                        <Col xs="6">
                          <Button color="primary"
                            className="px-4 btn-sm"
                            disabled={doubleClick}
                          >
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

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps)(ResetPassword);

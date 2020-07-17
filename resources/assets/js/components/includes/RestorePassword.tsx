import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Form,
  Button,
  Input,
  InputGroup,
} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';

interface IProps {}

interface IState {
  errors: any;
  doubleClick: boolean;
}

export class RestorePasswordComponent extends React.PureComponent<IProps> {
  public state: IState = {
    errors: null,
    doubleClick: false,
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const formElement = document.querySelector('form');

    this.setState({
      doubleClick: true,
    });

    axios
      .post('/password/email', new FormData(formElement))
      .then(() => {
        alert('Вам отправлено письмо');
        window.history.pushState(null, null, '/services/login');
        window.location.reload();
      })
      .catch((error) => {
        if (!error.response.data.errors) {
          window.location.reload();
        }

        this.setState({
          errors: error.response.data.errors,
          doubleClick: false,
        });
      });
  }

  render() {
    const {errors, doubleClick} = this.state;
    let errorsMessage = null;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              {errorsMessage}
              <CardGroup className="mb-0">
                <Card className="p-6">
                  <CardBody className="card-body">
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Восстановить пароль</h1>
                      <p className="text-muted">Восстановление пароля</p>
                      <InputGroup className="mb-3">
                        <Input
                          type="email"
                          name="email"
                          placeholder="E-mail"
                          required
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="12" lg="4">
                          <Button
                            color="primary"
                            className="px-4 btn-sm"
                            disabled={doubleClick}
                          >
                            Восстановить
                          </Button>
                        </Col>
                        <Col xs="12" lg="4">
                          <Link to="/services/login" className="btn btn-success btn-sm">
                            Вспомнил пароль
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
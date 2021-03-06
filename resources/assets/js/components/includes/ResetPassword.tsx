import React from 'react';
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

interface IProps {
  location: any;
}

interface IState {
  errors: any;
  doubleClick: boolean;
}

export class ResetPasswordComponent extends React.PureComponent<IProps> {
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
      .post('/password/reset', new FormData(formElement))
      .then(() => {
        history.pushState(null, null, '/services/login');
        window.location.reload();
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data.errors,
          doubleClick: false,
        });
      });
  };

  render() {
    const {location} = this.props;
    const {errors, doubleClick} = this.state;
    const urlSearchParams = new URLSearchParams(location.search);
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
                      <h1>Сбросить пароль</h1>
                      <p className="text-muted">Сброс пароля</p>
                      <InputGroup className="mb-3">
                        <Input
                          type="email"
                          name="email"
                          defaultValue={urlSearchParams.get('email')}
                          readOnly
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input
                          type="password"
                          name="password"
                          placeholder="Пароль"
                          required
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input
                          type="password"
                          name="password_confirmation"
                          placeholder="Подтвердите пароль"
                          required
                        />
                      </InputGroup>
                      <Input
                        type="hidden"
                        name="token"
                        defaultValue={urlSearchParams.get('token')}
                      />
                      <Row>
                        <Col xs="12" lg="4">
                          <Button
                            color="primary"
                            className="px-4 btn-sm"
                            disabled={doubleClick}
                          >
                            Сбросить пароль
                          </Button>
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

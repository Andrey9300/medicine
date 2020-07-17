import React from 'react';
import {connect} from 'react-redux';
import {registrationUser} from '../../actions/userActions';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Input,
  InputGroup,
  CardGroup,
} from 'reactstrap';
import {createMarkup} from '../../utils/errorsHelper';
import {TState} from '../../reducers';

interface IStateProps {
  user: {
    isAuthenticated: boolean;
  };
  errors: any;
}

interface IDispatchProps {
  registrationUser: typeof registrationUser;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  doubleClick: boolean;
}

class RegistrationComponent extends React.PureComponent<IProps> {
  public state: IState = {
    doubleClick: false,
  };

  componentWillReceiveProps() {
    this.setState({
      doubleClick: false,
    });
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {registrationUser} = this.props;
    this.setState({
      doubleClick: true,
    });

    registrationUser(document.querySelector('form'));
  };

  private handleLogin = () => {
    history.pushState(null, null, '/services/login');
    window.location.reload();
  };

  render() {
    const {errors} = this.props;
    const {doubleClick} = this.state;
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
                      <h1>Регистрация</h1>
                      <p className="text-muted">Создайте свой аккаунт</p>
                      <InputGroup className="mb-3">
                        <i className="icon-user" />
                        <Input
                          type="text"
                          name="fio"
                          placeholder="ФИО"
                          required
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input
                          type="email"
                          name="email"
                          placeholder="E-mail"
                          required
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
                          placeholder="Повторите пароль"
                          required
                        />
                      </InputGroup>
                      <Button color="success" block disabled={doubleClick}>
                        Создать аккаунт
                      </Button>
                      <Button color="primary" block onClick={this.handleLogin}>
                        Уже есть аккаунт
                      </Button>
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

const mapStateToProps = (state: TState) => {
  return {
    errors: state.users.errors,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    registrationUser: (form: HTMLFormElement) =>
      dispatch(registrationUser(form)),
  };
};

export const RegistrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationComponent);

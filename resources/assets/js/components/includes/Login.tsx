import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
import {clearUser, loginUser} from '../../actions/userActions';
import {createMarkup} from '../../utils/errorsHelper';
import {TState} from '../../reducers';
import {IUser} from "../../interface/IUser";

interface IStateProps {
  user: any;
  errors: any;
}

interface IDispatchProps {
  clearUser: typeof clearUser;
  loginUser: typeof loginUser;
}

interface IProps extends IStateProps, IDispatchProps {}

interface IState {
  doubleClick: boolean;
  showPassword: boolean;
}

class LoginComponent extends React.PureComponent<IProps> {
  public state: IState = {
    doubleClick: false,
    showPassword: false,
  };

  componentDidMount() {
    const {clearUser} = this.props;

    clearUser();
  }

  componentWillReceiveProps() {
    this.setState({
      doubleClick: false,
    });
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const {loginUser} = this.props;

    this.setState({
      doubleClick: true,
    });

    loginUser(document.querySelector('form'));
  };

  render() {
    const {user, errors} = this.props;
    const {doubleClick, showPassword} = this.state;
    let errorsMessage = null;

    if (user && user.isAuthenticated) {
      window.history.pushState(null, null, '/services/lmk/organizations');
    }

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
                      <h1>Вход</h1>
                      <p className="text-muted">Войдите в свой аккаунт</p>
                      <InputGroup className="mb-3">
                        <Input
                          type="email"
                          name="email"
                          placeholder="E-mail"
                          required
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Пароль"
                          required
                        />
                        <i
                          className={
                            showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                          }
                          aria-hidden="true"
                          style={{cursor: 'pointer'}}
                          onClick={() => {
                            this.setState({showPassword: !showPassword});
                          }}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="12" lg="4">
                          <Button
                            disabled={doubleClick}
                            color="primary"
                            className="px-4 btn-sm"
                          >
                            Войти
                          </Button>
                        </Col>
                        <Col xs="12" lg="4">
                          <Link
                            to="/services/registration"
                            className="btn btn-success btn-sm"
                          >
                            Регистрация
                          </Link>
                        </Col>
                        <Col xs="12" lg="4">
                          <Link
                            to="/services/restorePassword"
                            className="btn btn-warning btn-sm"
                          >
                            Забыли пароль?
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

const mapStateToProps = (state: TState) => {
  return {
    errors: state.users.errors,
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    clearUser: () => dispatch(clearUser()),
    loginUser: (form: HTMLFormElement) => dispatch(loginUser(form)),
  };
};

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);

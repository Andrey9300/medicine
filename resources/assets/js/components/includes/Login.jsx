import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
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
import {loginUser} from '../../actions/userActions';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      doubleClick: false,
      showPassword: false,
    };

    this.props.dispatch({
      payload: [],
      type: 'LOGIN_USER_CLEAR_ERRORS',
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      doubleClick: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      doubleClick: true,
    });
    this.props.dispatch(loginUser(document.querySelector('form')));
  }

  createMarkup() {
    const {errors} = this.props;

    return Object.keys(errors).map((item) => {
      return errors[item].map((value, index) => {
        return <p key={index}>{value}</p>;
      });
    });
  }

  render() {
    const {user, errors} = this.props;
    const {doubleClick, showPassword} = this.state;
    let errorsMessage = '';

    if (user && user.isAuthenticated) {
      window.history.pushState(null, null, '/organizations');
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {this.createMarkup()}
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
                            to="registration"
                            className="btn btn-success btn-sm"
                          >
                            Регистрация
                          </Link>
                        </Col>
                        <Col xs="12" lg="4">
                          <Link
                            to="restorePassword"
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

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.users.errors,
    user: state.users.user,
  };
};

export default connect(mapStateToProps)(Login);

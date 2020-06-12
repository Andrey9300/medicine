import React from 'react';
import {connect} from 'react-redux';
import {registrationUser} from '../../actions/userActions';
import PropTypes from 'prop-types';
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

class Registration extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      doubleClick: false,
    };
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
    this.props.dispatch(registrationUser(document.querySelector('form')));
  }

  handleLogin() {
    history.pushState(null, null, '/lmk/login');
    window.location.reload();
  }

  render() {
    const {errors} = this.props;
    const {doubleClick} = this.state;
    let errorsMessage = '';

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

Registration.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    errors: state.users.errors,
    users: state.users.users,
  };
};

export default connect(mapStateToProps)(Registration);

import React from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {registrationAuditorUser} from '../../actions/userActions';
import {createMarkup} from '../../utils/errorsHelper';
import {TState} from '../../reducers';

interface IStateProps {}

interface IDispatchProps {
  registrationAuditorUser: typeof registrationAuditorUser;
}

interface IProps extends IStateProps, IDispatchProps {
  errors: any;
}

class NewUser extends React.PureComponent<IProps> {
  handleSubmit = (event: any) => {
    const {registrationAuditorUser} = this.props;
    event.preventDefault();

    registrationAuditorUser(document.querySelector('form'));
  };

  render() {
    const {errors} = this.props;
    let errorsMessage;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" md="6">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Добавить аудитора</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="fio" name="fio" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="email" name="email" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Временный пароль</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        required
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Сохранить
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: TState) => {
  return {
    errors: state.users.errors,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    registrationAuditorUser: (form: any) =>
      dispatch(registrationAuditorUser(form)),
  };
};

export const NewUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUser);

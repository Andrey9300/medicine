import React from 'react';
import {connect} from 'react-redux';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  CardFooter,
  Button,
} from 'reactstrap';
import {editUser, fetchUser} from '../../actions/userActions';
import {createMarkup} from '../../utils/errorsHelper';
import {TState} from '../../reducers';

interface IState {
  userId: number;
}

interface IStateProps {
  user: any;
}

interface IDispatchProps {
  editUser: typeof editUser;
  fetchUser: typeof fetchUser;
}

interface IProps extends IStateProps, IDispatchProps {
  errors: any;
  match: any;
}

class EditUser extends React.PureComponent<IProps, IState> {
  state: IState = {
    userId: null,
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const {editUser} = this.props;
    const {userId} = this.state;

    editUser(document.querySelector('form'), userId);
  };

  componentDidMount() {
    const {fetchUser, match} = this.props;
    const userId = match.params.id;

    this.setState({userId});

    fetchUser(userId);
  }

  render() {
    const {user, errors} = this.props;
    let errorsMessage;

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return (
      <div className="animated fadeIn">
        {errorsMessage}
        <Row>
          <Col xs="12" sm="12" md="8" lg="8" xl="8">
            <Card>
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>
                <CardHeader>Редактировать профиль</CardHeader>
                <CardBody className="card-body">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">ФИО</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input name="fio" id="fio" defaultValue={user.fio} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">E-mail</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        name="email"
                        id="email"
                        defaultValue={user.email}
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
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    editUser: (form: any, userId: number) => dispatch(editUser(form, userId)),
    fetchUser: (userId: number) => dispatch(fetchUser(userId)),
  };
};

export const EditUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser);

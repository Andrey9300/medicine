import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
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

class EditUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(
      editUser(document.querySelector('form'), this.state.userId),
    );
  }

  componentDidMount() {
    this.props.dispatch(fetchUser(this.state.userId));
  }

  render() {
    const {user, errors} = this.props;
    let errorsMessage = '';

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
                      <Input
                        type="input"
                        name="fio"
                        id="fio"
                        defaultValue={user.fio}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">E-mail</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="input"
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

EditUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export const EditUserContainer = connect(mapStateToProps)(EditUser);

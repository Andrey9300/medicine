import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {fetchUser} from '../../actions/userActions';
import {createMarkup} from '../../utils/errorsHelper';

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
    };
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
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />Пользователь
                <Link
                  to={`/services/profiles/edit/${user.id}`}
                  style={{
                    marginLeft: '18px',
                  }}
                >
                  <i className="fa fa-pencil" />
                </Link>
              </CardHeader>
              <CardBody className="card-body">
                <Table responsive>
                  <tbody>
                  <tr>
                    <td>ФИО:</td>
                    <td>{user.fio}</td>
                  </tr>
                  <tr>
                    <td>E-mail:</td>
                    <td>{user.email}</td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export const UserContainer = connect(mapStateToProps)(User);

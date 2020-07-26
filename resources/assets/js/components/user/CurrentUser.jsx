import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {fetchCurrentUser} from '../../actions/userActions';
import {createMarkup} from '../../utils/errorsHelper';

class CurrentUser extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
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

CurrentUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.users.currentUser,
  };
};

export const CurrentUserContainer = connect(mapStateToProps)(CurrentUser);

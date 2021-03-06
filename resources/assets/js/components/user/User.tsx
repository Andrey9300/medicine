import React from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody, Table} from 'reactstrap';
import {fetchUser} from '../../actions/userActions';
import {createMarkup} from '../../utils/errorsHelper';
import {TState} from '../../reducers';

interface IStateProps {
  user: any;
}

interface IDispatchProps {
  fetchUser: typeof fetchUser;
}

interface IProps extends IStateProps, IDispatchProps {
  errors: any;
  match: any;
}

class User extends React.PureComponent<IProps> {
  componentDidMount() {
    const {match, fetchUser} = this.props;
    fetchUser(match.params.id);
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
              <CardHeader>
                <i className="fa fa-building-o" aria-hidden="true" />
                Пользователь
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

const mapStateToProps = (state: TState) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchUser: (userId: number) => dispatch(fetchUser(userId)),
  };
};

export const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

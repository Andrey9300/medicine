import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import {fetchCurrentUser} from '../../actions/userActions';

interface IDispatchProps {
  fetchCurrentUser: typeof fetchCurrentUser;
}

interface IProps extends IDispatchProps {}

class ActivateAccount extends React.PureComponent<IProps> {
  componentDidMount() {
    const {fetchCurrentUser} = this.props;

    fetchCurrentUser();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-center">
              <CardHeader>Вы активировали email</CardHeader>
              <CardBody>
                <Link
                  to={'/services/lmk/organizations/create'}
                  className={'active'}
                >
                  Добавить компанию
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  };
};

export default connect(null, mapDispatchToProps)(ActivateAccount);

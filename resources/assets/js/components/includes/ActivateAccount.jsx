import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import {fetchCurrentUser} from '../../actions/userActions';

class ActivateAccount extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-center">
              <CardHeader>Вы активировали email</CardHeader>
              <CardBody>
                <Link to={'/organizations/create'} className={'active'}>
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

ActivateAccount.propTypes = {
  router: PropTypes.object,
};

export default connect(null)(ActivateAccount);

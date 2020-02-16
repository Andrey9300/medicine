import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBlock, CardHeader} from 'reactstrap';

class ActivateAccount extends React.PureComponent {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card className="text-center">
              <CardHeader>Вы активировали email</CardHeader>
              <CardBlock>
                <Link to={'/organizations/create'} className={'active'}>Добавить компанию</Link>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ActivateAccount;

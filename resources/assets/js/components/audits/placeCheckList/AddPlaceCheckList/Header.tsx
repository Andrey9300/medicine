import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {IPlaceCheckList} from "../../../../interface/audit/IPlaceCheckList";

interface IProps {
    placeCheckList: IPlaceCheckList;
}

export const Header: React.FC<IProps> = ({placeCheckList}) => (
  <Card>
    <CardHeader>
      <i className="fa fa-building-o" aria-hidden="true" />
      Провести аудит
    </CardHeader>
    <CardBody className="card-body">
      <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
        <Col>Подразделение:</Col>
        <Col>«{placeCheckList.unit.name}»</Col>
      </Row>
      <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
        <Col>Локация:</Col>
        <Col>«{placeCheckList.location.name}»</Col>
      </Row>
      <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
        <Col>Помещение:</Col>
        <Col>
          <Link
            to={`/services/audits/place/${placeCheckList.place.id}`}
            style={{fontSize: '16px'}}
          >
            «{placeCheckList.place.name}»
          </Link>
        </Col>
      </Row>
      <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
        <Col>Группа критериев:</Col>
        <Col>«{placeCheckList.groupCriterion.name}»</Col>
      </Row>
      <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
        <Col>Дата:</Col>
        <Col>
          {new Date(Date.now()).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </Col>
      </Row>
    </CardBody>
  </Card>
);

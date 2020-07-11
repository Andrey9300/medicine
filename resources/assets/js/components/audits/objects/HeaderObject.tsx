import {Link} from 'react-router-dom';
import React from 'react';
import {Col, Row, Card, CardHeader} from 'reactstrap';
import {ILocation} from '../../../interface/audit/ILocation';
import {IUnit} from '../../../interface/audit/IUnit';
import {IPlace} from '../../../interface/audit/IPlace';

interface IProps {
  obj: IUnit | ILocation | IPlace;
  objUrl: string;
}

export const HeaderObjectComponent: React.FC<IProps> = ({obj, objUrl}) => (
  <div className="col-12 border">
    <Row>
      <Col xs="8">
        <Link
          to={`/services/audits/place/${obj.id}`}
          style={{fontSize: '16px'}}
        >
          {' '}
          «{obj.name}»
        </Link>
      </Col>
      <Col xs="4">
        <Link to={`/services/audits/addPlaceCheckList/${obj.id}`}>
          Провести аудит
        </Link>
      </Col>
    </Row>
  </div>
);

export const EmptyObjectComponent: React.FC<{objName: string}> = ({
  objName,
}) => (
  <Card className="text-center">
    <CardHeader>
      <i className="fa fa-building-o" aria-hidden="true" />
      {objName} нет
    </CardHeader>
  </Card>
);

export const ExpandComponent: React.FC<{
  collapse: boolean;
  toggle: () => any;
}> = ({collapse, toggle}) => (
  <span style={{marginLeft: '20px', cursor: 'pointer'}} onClick={toggle}>
    <i
      className={`fa fa-caret-${collapse ? 'up' : 'down'}`}
      aria-hidden="true"
    />{' '}
    {collapse ? 'Свернуть' : 'Развернуть'}
  </span>
);

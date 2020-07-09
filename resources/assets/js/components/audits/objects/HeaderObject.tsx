import {Link} from 'react-router-dom';
import React from 'react';
import {Col, Row, Card, CardHeader} from 'reactstrap';
import {ILocation} from '../../../interface/audit/ILocation';
import {IUnit} from '../../../interface/audit/IUnit';
import {IPlace} from '../../../interface/audit/IPlace';

interface IProps {
  obj: IUnit | ILocation | IPlace;
  objUrl: string;
  objName: string;
}

export const HeaderObjectComponent: React.FC<IProps> = ({
  obj,
  objName,
  objUrl,
}) => (
  <Row>
    <div className="col-6 py-3 px-lg-5 border bg-light">
      {objName}:{' '}
      <Link
        to={`/services/audits/${objUrl}/${obj.id}`}
        style={{fontWeight: 600}}
      >
        {obj.name}
      </Link>
    </div>
    <div className="col-3 py-3 px-lg-5 border bg-light">
      <Link to={`/services/audits/${objUrl}/${obj.id}`}>
        Редактировать <i className="fa fa-pencil" />
      </Link>
    </div>
    <div className="col-3 py-3 px-lg-5 border bg-light">
      Удалить <i className="fa fa-trash" />
    </div>
  </Row>
);

export const EmptyObjectComponent: React.FC<{objName: string}> = ({
  objName,
}) => (
  <Col sm="12" md="6">
    <Card className="text-center">
      <CardHeader>
        <i className="fa fa-building-o" aria-hidden="true" />
        {objName} нет
      </CardHeader>
    </Card>
  </Col>
);

export const ExpandComponent: React.FC<{
  collapse: boolean;
  toggle: () => any;
}> = ({collapse, toggle}) => (
  <span style={{marginLeft: '20px', cursor: 'pointer'}} onClick={toggle}>
    <i className={`fa fa-caret-${collapse ? 'up' : 'down'}`} aria-hidden="true" />{' '}
    {collapse ? 'Свернуть' : 'Развернуть'}
  </span>
);

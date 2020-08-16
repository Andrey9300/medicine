import React from 'react';
import {Row, Col, Input} from 'reactstrap';

import {EIconsPestPlace, IPestPlace} from '../../../interface/pest/IPestPlace';

interface IProps {
  pestPlace?: IPestPlace;
  index: number;
}

export const getData = (type: any) => {
  let color;
  let select;
  let img;

  switch (type) {
    case '1':
      color = 'rgba(209, 219, 225, 0.3)';
      select = (
        <>
          <option value="0">"0" - насекомых нет</option>
          <option value="1">"1" - 1-3 экз</option>
          <option value="2">"2" - 3-10 экз</option>
          <option value="3">"3" - более 10 экз</option>
        </>
      );
      img = EIconsPestPlace.INSECT;
      break;
    case '2':
      color = 'rgba(142, 142, 142, 0.3)';
      select = (
        <>
          <option value="8">"0" - летучих нет</option>
          <option value="9">"1" - 1-3 летучих</option>
          <option value="10">"2" - 3-10 летучих</option>
          <option value="11">"3" - более 10 летучих</option>
        </>
      );
      img = EIconsPestPlace.FLY;
      break;
    case '3':
      color = 'rgba(83, 108, 121, 0.3)';
      select = (
        <>
          <option value="4">"0" - погрызов</option>
          <option value="5">"1" - 1-3 погрыза</option>
          <option value="6">"2" - 3-10 погрызов</option>
          <option value="7">"3" - более 10 погрыов</option>
        </>
      );
      img = EIconsPestPlace.MOUSE;
      break;
    default: {
      color = 'black';
      break;
    }
  }

  return {select, color, img};
};

export const CriteriaListNew: React.FC<IProps> = ({pestPlace, index}) => {
  const {select, color, img} = getData(pestPlace.type);

  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        height: '50px',
      }}
    >
      <Col xs="2" className="text-center">
        <img src={img} width="24px" height="24px" /> {pestPlace.name}
        <Input type="hidden" name={`placeId[${index}]`} value={pestPlace.id} />
      </Col>
      <Col xs="3" className="text-center">
        <Input
          type="select"
          name={`checked[${index}]`}
          style={{
            height: '40px',
          }}
        >
          <option value="1">Проверен</option>
          <option value="2">Не проверен</option>
          <option value="3">Не доступен</option>
        </Input>
      </Col>
      <Col xs="4" className="text-center">
        <Input
          type="select"
          name={`count[${index}]`}
          style={{
            height: '40px',
          }}
        >
          {select}
        </Input>
      </Col>
      <Col xs="3" className="text-center">
        <Input type="checkbox" name={`changed[${index}]`} />
      </Col>
    </Row>
  );
};

import React from 'react';
import {Row, Col, Input} from 'reactstrap';

import {
  IPestControlCriterion,
  TChecked,
} from '../../../interface/pest/IPestControl';
import {getData} from './CriteriaListNew';

interface IProps {
  pestControlCriterion?: IPestControlCriterion;
  index: number;
}

const getChecked = (checked: TChecked) => {
  let text;

  switch (checked) {
    case '1':
      text = 'Проверен';
      break;
    case '2':
      text = 'Не проверен';
      break;
    case '3':
      text = 'Не доступен';
      break;
    default:
      text = 'Не доступен';
      break;
  }

  return text;
};

export const CriteriaList: React.FC<IProps> = ({
  pestControlCriterion,
  index,
}) => {
  const {select, color, img} = getData(pestControlCriterion.place.type);

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
        <img src={img} /> {pestControlCriterion.place.name}
      </Col>
      <Col xs="3" className="text-center">
        {getChecked(pestControlCriterion.checked)}
      </Col>
      <Col xs="4" className="text-center">
        <Input
          type="select"
          name={`count[${index}]`}
          style={{height: '40px'}}
          disabled
          defaultValue={pestControlCriterion.count}
        >
          {select}
        </Input>
      </Col>
      <Col xs="3" className="text-center">
        {pestControlCriterion.changed ? 'Замена' : 'Не меняли'}
      </Col>
    </Row>
  );
};

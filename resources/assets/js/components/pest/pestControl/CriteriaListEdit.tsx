import React from 'react';
import {Row, Col, Input} from 'reactstrap';

import {IPestControlCriterion} from '../../../interface/pest/IPestControl';
import {getData} from './CriteriaListNew';

interface IProps {
  pestControlCriterion?: IPestControlCriterion;
  index: number;
}

export const CriteriaListEdit: React.FC<IProps> = ({
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
        <Input
          type="hidden"
          name={`pestControlCriterionId[${index}]`}
          value={pestControlCriterion.id}
        />
        <Input
          type="hidden"
          name={`placeId[${index}]`}
          value={pestControlCriterion.place.id}
        />
      </Col>
      <Col xs="3" className="text-center">
        <Input
          type="select"
          name={`checked[${index}]`}
          style={{
            height: '40px',
          }}
          defaultValue={pestControlCriterion.checked}
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
          style={{height: '40px'}}
          defaultValue={pestControlCriterion.count}
        >
          {select}
        </Input>
      </Col>
      <Col xs="3" className="text-center">
        <Input
          type="checkbox"
          name={`changed[${index}]`}
          defaultChecked={pestControlCriterion.changed}
        />
      </Col>
    </Row>
  );
};

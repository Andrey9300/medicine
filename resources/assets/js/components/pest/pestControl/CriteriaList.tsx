import React from 'react';
import {Row, Col, Input} from 'reactstrap';

import {IPestControlCriterion} from '../../../interface/pest/IPestControl';
import {IPestPlace} from '../../../interface/pest/IPestPlace';

interface IProps {
  pestPlace?: IPestPlace;
  pestControlCriterion?: IPestControlCriterion;
  index: number;
}
export const CriteriaList: React.FC<IProps> = ({
  pestPlace,
  pestControlCriterion,
  index,
}) => (
  <Row
    style={{
      borderBottom: '1px solid #c2cfd6',
      marginBottom: '8px',
      paddingBottom: '8px',
    }}
  >
    <Col xs="2" className="text-center">
      <i className="fa fa-paw" aria-hidden="true" />{' '}
      {pestPlace?.name || pestControlCriterion?.place?.name}
      <Input
        type="hidden"
        name={`placeId[${index}]`}
        value={pestPlace?.id || pestControlCriterion?.place?.id}
      />
    </Col>
    <Col xs="3" className="text-center">
      <Input
        type="checkbox"
        name={`checked[${index}]`}
        defaultChecked={pestControlCriterion?.checked}
      />
    </Col>
    <Col xs="4" className="text-center">
      <Input
        type="select"
        name={`count[${index}]`}
        defaultValue={pestControlCriterion?.count}
      >
        <option value="0">"0" - насекомых нет</option>
        <option value="1">"1" - 1-3 экз</option>
        <option value="2">"2" - 3-10 экз</option>
        <option value="3">"3" - более 10 экз</option>
      </Input>
    </Col>
    <Col xs="3" className="text-center">
      <Input
        type="checkbox"
        name={`changed[${index}]`}
        defaultChecked={pestControlCriterion?.changed}
      />
    </Col>
  </Row>
);

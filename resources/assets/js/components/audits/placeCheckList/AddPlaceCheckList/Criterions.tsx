import React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  CardFooter,
  Button,
  CardBody,
} from 'reactstrap';
import {IPlaceCheckList} from '../../../../interface/audit/IPlaceCheckList';

interface IProps {
  placeCheckList: IPlaceCheckList;
  handleSubmit: (event: any) => any;
}

export const Criterions: React.FC<IProps> = ({
  placeCheckList,
  handleSubmit,
}) => (
  <Card>
    <CardBody>
      <Form className="form-horizontal">
        <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
          <Col xs="6">Критерий</Col>
          <Col xs="1">Оценка</Col>
          <Col xs="5">Комментарий</Col>
        </Row>

        {placeCheckList.criterions.map((criterion) => (
          <Row
            key={criterion.id}
            style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
          >
            <Col xs="6">
              <Input
                type="hidden"
                id="criterionId"
                name={`criterionId[${criterion.id}]`}
                defaultValue={criterion.id}
              />
              {criterion.name}
            </Col>
            <Col xs="1">
              <div>
                <Input type="radio" name={`mark[${criterion.id}]`} value="3" />
                <span style={{color: 'green', fontWeight: 'bold'}}>A</span>
              </div>
              <div>
                <Input type="radio" name={`mark[${criterion.id}]`} value="2" />
                <span style={{color: '#d39e00', fontWeight: 'bold'}}>B</span>
              </div>
              <div>
                <Input type="radio" name={`mark[${criterion.id}]`} value="1" />
                <span style={{color: 'red', fontWeight: 'bold'}}>C</span>
              </div>
              <div>
                <Input
                  type="radio"
                  name={`mark[${criterion.id}]`}
                  value="0"
                  defaultChecked
                />
                <span style={{color: 'black', fontWeight: 'bold'}}>N</span>
              </div>
            </Col>
            <Col xs="5">
              <Input
                type="textarea"
                name={`comment[${criterion.id}]`}
                rows="5"
                cols="33"
                placeholder="Комментарий"
              />
            </Col>
          </Row>
        ))}
      </Form>
    </CardBody>
    <CardFooter>
      <Button type="submit" size="sm" color="success" onClick={handleSubmit}>
        <i className="fa fa-dot-circle-o" /> Сохранить
      </Button>
    </CardFooter>
  </Card>
);

import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {ICriterionList} from '../../../interface/audit/ICriterionList';

interface IProps {
  placeId: number;
  placeCheckLists: ICriterionList;
}

export class CheckListsComponent extends React.PureComponent<IProps> {
  render() {
    const {placeId, placeCheckLists} = this.props;
    const checkLists = placeCheckLists?.checkLists;

    return (
      <Col xs="12" sm="12" md="8" lg="8" xl="8">
        <Card>
          {placeCheckLists?.groupCriterion ? (
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Чек-листы помещения ({checkLists?.length})
              <Link
                to={`/services/audits/addPlaceCheckList/${placeId}`}
                className="btn btn-primary btn-sm pull-right"
              >
                Добавить <i className="icon-plus" />
              </Link>
            </CardHeader>
          ) : (
            <CardHeader>
              <Link to={`/services/audits/place/edit/${placeId}`}>
                Укажите чек лист
              </Link>
            </CardHeader>
          )}

          {checkLists && checkLists.length > 0 && (
            <CardBody className="card-body">
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Дата:</Col>
                <Col>Отправлен аудироемому</Col>
              </Row>
              {checkLists.map((checkList) => (
                <Row
                  key={checkList.id}
                  style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}
                >
                  <Col>
                    <Link
                      to={`/services/audits/placeCheckList/criterions/${checkList.id}`}
                    >
                      {checkList.created_at}
                    </Link>
                  </Col>
                  <Col>{checkList.sended ? 'Да' : 'Нет'}</Col>
                </Row>
              ))}
            </CardBody>
          )}
        </Card>
      </Col>
    );
  }
}

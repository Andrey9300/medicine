import React from 'react';
import {
  clearPestControl,
  deletePestControl,
  fetchPestControl,
} from '../../../actions/pest/controlActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {
  IPestControl,
  IPestControlCriterion,
} from '../../../interface/pest/IPestControl';
import {CriteriaList} from './CriteriaList';

interface IPestControlStateProps {
  pestControlCriteria: IPestControlCriterion[];
  pestControl: IPestControl;
  fetched?: boolean;
  errors?: any;
}

export interface IPestControlDispatchProps {
  clearPestControl?: typeof clearPestControl;
  fetchPestControl?: typeof fetchPestControl;
  deletePestControl?: typeof deletePestControl;
}

interface IPestControlProps
  extends IPestControlStateProps,
    IPestControlDispatchProps {
  match?: any;
}

export class PestControlComponent extends React.PureComponent<
  IPestControlProps
> {
  componentDidMount() {
    const {clearPestControl, fetchPestControl, match} = this.props;

    if (!match) {
      return;
    }

    clearPestControl();
    fetchPestControl(match.params.id);
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deletePestControl} = this.props;

    const result = confirm(
      'Удаление приведет к потере данных контроля по этой точке. Удалить?',
    );

    if (result) {
      deletePestControl(id);
    }
  };

  render() {
    const {pestControl, pestControlCriteria, errors} = this.props;
    let errorsMessage = null;

    if (!pestControl) {
      return null;
    }

    if (errors) {
      errorsMessage = (
        <div className="alert alert-danger" role="alert">
          {createMarkup(errors)}
        </div>
      );
    }

    return (
      <Row>
        <Col xs="12" sm="12" md="8" lg="8" xl="8">
          <Card>
            {errorsMessage}
            <CardHeader>
              <i className="fa fa-building-o" aria-hidden="true" />
              Точка контроля
              <Link
                to={`/services/pest/control/edit/${pestControl.id}`}
                style={{
                  marginLeft: '18px',
                }}
              >
                <i className="fa fa-pencil" />
              </Link>
              <span
                className="pull-right"
                onClick={(event) => this.handleBtnDelete(pestControl.id, event)}
              >
                <i className="fa fa-trash" />
              </span>
            </CardHeader>
            <CardBody className="card-body">
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Дата:</Col>
                <Col>{pestControl.created_at}</Col>
              </Row>{' '}
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Комментарий:</Col>
                <Col>{pestControl.comment ? pestControl.comment : '-'}</Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Результат</CardHeader>
            <CardBody>
              <Row
                style={{
                  borderTop: '1px solid #c2cfd6',
                  padding: '12px 0',
                  textAlign: 'center',
                }}
              >
                <Col xs="2">Точка контроля</Col>
                <Col xs="3">Состояние точки контроля</Col>
                <Col xs="4">Учет численности</Col>
                <Col xs="3">Замена ловушки</Col>
              </Row>
              {pestControlCriteria.map((pestControlCriterion, index) => (
                <CriteriaList
                  key={index}
                  pestControlCriterion={pestControlCriterion}
                  index={index}
                />
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

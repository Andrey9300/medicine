import React from 'react';
import {
  clearPestPlace,
  deletePestPlace,
  fetchPestPlace,
} from '../../../actions/pest/placeActions';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import {createMarkup} from '../../../utils/errorsHelper';
import {IPestPlace, TPestPlaceType} from '../../../interface/pest/IPestPlace';

interface IPestPlaceStateProps {
  pestPlace: IPestPlace;
  fetched?: boolean;
  errors?: any;
}

export interface IPestPlaceDispatchProps {
  clearPestPlace?: typeof clearPestPlace;
  fetchPestPlace?: typeof fetchPestPlace;
  deletePestPlace?: typeof deletePestPlace;
}

interface IPestPlaceProps
  extends IPestPlaceStateProps,
    IPestPlaceDispatchProps {
  match?: any;
}

export class PestPlaceComponent extends React.PureComponent<IPestPlaceProps> {
  componentDidMount() {
    const {clearPestPlace, fetchPestPlace, match} = this.props;

    if (!match) {
      return;
    }

    clearPestPlace();
    fetchPestPlace(match.params.id);
  }

  handleBtnDelete = (id: number, event: any) => {
    event.preventDefault();
    const {deletePestPlace} = this.props;

    const result = confirm(
      'Удаление приведет к потере данных аудита по этой точке и потере самой точки. Удалить?',
    );

    if (result) {
      deletePestPlace(id);
    }
  };

  private getData = (type: TPestPlaceType) => {
    let textType;
    let img;

    switch (type) {
      case '1':
        textType = 'Насекомые';
        img = '/img/mosquito.png';
        break;
      case '2':
        textType = 'Летучие';
        img = '/img/macaw.png';
        break;
      case '3':
        textType = 'Грызуны';
        img = '/img/mouse.png';
        break;
    }

    return {textType, img};
  };

  render() {
    const {pestPlace, errors} = this.props;
    let errorsMessage = null;

    if (!pestPlace) {
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
                to={`/services/pest/places/edit/${pestPlace.id}`}
                style={{
                  marginLeft: '18px',
                }}
              >
                <i className="fa fa-pencil" />
              </Link>
              <span
                className="pull-right"
                onClick={(event) => this.handleBtnDelete(pestPlace.id, event)}
              >
                <i className="fa fa-trash" />
              </span>
            </CardHeader>
            <CardBody className="card-body">
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Наименование:</Col>
                <Col>
                  <img src={this.getData(pestPlace.type).img} />{' '}
                  {pestPlace.name}
                </Col>
              </Row>
              <Row style={{borderTop: '1px solid #c2cfd6', padding: '12px 0'}}>
                <Col>Тип:</Col>
                <Col>{this.getData(pestPlace.type).textType}</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

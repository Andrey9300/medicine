import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody, Row, Col, Collapse} from 'reactstrap';

import {IPestPlace, TPestPlaceType} from '../../../interface/pest/IPestPlace';
import {fetchPestPlacesForLocation} from '../../../actions/pest/placeActions';
import {NewPestPlaceContainer} from './New';
import {ExpandComponent} from '../../audits/objects/HeaderObject';
import {PestPlaceComponent} from './PestPlace';

interface IPestPlacesStateProps {
  pestPlaces: IPestPlace[];
  fetched?: boolean;
  errors?: any;
}

export interface IPestPlacesDispatchProps {
  fetchPestPlacesForLocation?: typeof fetchPestPlacesForLocation;
}

interface IPestPlacesProps
  extends IPestPlacesStateProps,
    IPestPlacesDispatchProps {
  locationId: number;
}

interface IState {
  collapse: boolean;
}

export class PestPlacesComponent extends React.PureComponent<IPestPlacesProps> {
  public state: IState = {
    collapse: false,
  };

  private toggle = () => {
    const {collapse} = this.state;
    this.setState({collapse: !collapse});
  };

  componentDidMount() {
    const {fetchPestPlacesForLocation, locationId} = this.props;

    fetchPestPlacesForLocation(locationId);
  }

  render() {
    const {collapse} = this.state;
    const {pestPlaces, locationId} = this.props;

    if (!pestPlaces || pestPlaces.length === 0) {
      return (
        <Card>
          <CardHeader>
            <i className="fa fa-building-o" aria-hidden="true" />
            Добавить точку PEST контроля
          </CardHeader>
          <CardBody className="card-body">
            <NewPestPlaceContainer locationId={locationId} />
          </CardBody>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <i className="fa fa-plus" aria-hidden="true" />
          Добавить точку PEST контроля
        </CardHeader>
        <CardBody className="card-body">
          <NewPestPlaceContainer locationId={locationId} />
        </CardBody>
        <CardHeader>
          <i className="fa fa-map-marker" aria-hidden="true" />
          Точки pest контроля ({pestPlaces.length})
          <ExpandComponent collapse={collapse} toggle={this.toggle} />
        </CardHeader>
        <Collapse isOpen={collapse}>
          <CardBody className="card-body">
            <Row
              style={{
                borderBottom: '1px solid #c2cfd6',
                marginBottom: '8px',
                paddingBottom: '8px',
              }}
            >
              <Col xs="2">Наименование</Col>
              <Col xs="2">Тип</Col>
            </Row>
            {pestPlaces.map((pestPlace, index, arr) => (
              <Row
                key={`${pestPlace.id}${index}`}
                style={{
                  borderBottom: '1px solid #c2cfd6',
                  marginBottom: '8px',
                  paddingBottom: '8px',
                }}
              >
                <Col xs="2">
                  <img
                    src={PestPlaceComponent.getData(arr[index].type).img}
                    width="24px"
                    height="24px"
                  />{' '}
                  <Link to={`/services/pest/places/${arr[index].id}`}>
                    {pestPlace.name}
                  </Link>
                </Col>
                <Col xs="2">
                  {PestPlaceComponent.getData(arr[index].type).textType}
                </Col>
                {arr[index + 1] && (
                  <>
                    <Col xs="2">
                      <img
                        src={
                          PestPlaceComponent.getData(arr[index + 1].type).img
                        }
                        width="24px"
                        height="24px"
                      />{' '}
                      <Link to={`/services/pest/places/${arr[index + 1].id}`}>
                        {pestPlace.name}
                      </Link>
                    </Col>
                    <Col xs="2">
                      {PestPlaceComponent.getData(arr[index + 1].type).textType}
                    </Col>
                  </>
                )}
              </Row>
            ))}
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

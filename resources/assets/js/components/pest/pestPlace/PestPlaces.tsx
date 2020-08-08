import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody, Row, Col, Collapse} from 'reactstrap';

import {IPestPlace} from '../../../interface/pest/IPestPlace';
import {fetchPestPlacesForLocation} from '../../../actions/pest/placeActions';
import {NewPestPlaceContainer} from './New';
import {ExpandComponent} from '../../audits/objects/HeaderObject';

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
            Добавить
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
          Добавить точку контроля
        </CardHeader>
        <CardBody className="card-body">
          <NewPestPlaceContainer locationId={locationId} />
        </CardBody>
        <CardHeader>
          <i className="fa fa-map-marker" aria-hidden="true" />
          Точки контроля ({pestPlaces.length})
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
            </Row>
            {pestPlaces.map((pestPlace, index) => (
              <Row
                key={`${pestPlace.id}${index}`}
                style={{
                  borderBottom: '1px solid #c2cfd6',
                  marginBottom: '8px',
                  paddingBottom: '8px',
                }}
              >
                <Col xs="2">
                  <Link to={`/services/pest/places/${pestPlace.id}`}>
                    {pestPlace.name}
                  </Link>
                </Col>
              </Row>
            ))}
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}
